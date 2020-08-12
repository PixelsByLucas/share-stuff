const express = require("express");
const dateMath = require("../utils/dateMath")
const router = new express.Router();
const LendingRequest = require("../models/notifications/lendingRequest")
const BorrowRequest = require('../models/notifications/borrowRequest')
const Transaction = require("../models/transaction");
const User = require("../models/user")
const Item = require("../models/item")
const verifyNotification = require('../middleware/verifyNotification')
const auth = require("../middleware/auth");
const socket = require("../sockets/socket");
const { path } = require("../server");
const { lendingRequestText, borrowRequestText } = require('../emails/body')
const sendTextEmail = require('../emails/send')
const agenda = require('../jobs/agenda')

// === Create Lending Request ===
router.post(
  '/transaction',
  auth,
  async (req, res) => {
    const { itemId, pickUpTime, dropOffTime, message } = req.body
    req.body.borrowerId = req.user._id;
    req.body.status = 'pending'

    try {
      const item = await Item.findById(req.body.itemId)
      const borrower = await User.findById(req.user._id)


      if (!item) {
        throw new Error('Item does not exist')
      }

      if (borrower.karma < item.price * dateMath.duration(pickUpTime, dropOffTime)) {
        throw new Error('Not enough karma to borrow this item')
      }

      if (!item.available) {
        throw new Error('Item is currently unavailable')
      }

      // == create new transaction ==
      const transactionRequest = new Transaction({ ...req.body, price: item.price * dateMath.duration(pickUpTime, dropOffTime) });
      await transactionRequest.save();

      // == create new notification ==
      const lendingRequestData = {
        borrowerUsername: req.user.username,
        transactionId: transactionRequest._id,
        itemName: item.name,
        itemImageId: item.media[0]._id,
        itemId,
        pickUpTime,
        dropOffTime,
        message
      }

      const lendingRequest = new LendingRequest(lendingRequestData);
      await lendingRequest.save()

      // == associate notification with lender ==
      const lender = await User.findById(req.body.lenderId)
      lender.notifications.push({ notification: lendingRequest._id, notificationType: "LendingRequest" })
      await lender.save()

      // == send socket notification or email to lender ==
      const notification = await lendingRequest.populate({ path: "transaction" }).execPopulate()

      if (lender.isLoggedIn && lender.socketId) {
        socket.emitNotification({ notification, notificationType: "LendingRequest" }, lender.socketId)
      } else {
        sendTextEmail(lender.email, 'New Lending Request', lendingRequestText(notification, lender.username))
      }

      // == deduct karma from borrower ==
      borrower.karma = borrower.karma - item.price * dateMath.duration(pickUpTime, dropOffTime)
      await borrower.save()

      res.status(201).json(borrower.karma)
    } catch (error) {
      console.log("ERROR", error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Update Transaction accept/decline
router.put("/transaction/status/:id", auth, verifyNotification, async (req, res) => {
  try {
    const { transaction } = req.notification;
    if (transaction.status !== "pending") {
      throw new Error(`${transaction.status} transactions cannot be accepted`);
    }

    // == send borrowRequest notification to borrower ==
    const borrowRequest = new BorrowRequest({
      transactionId: transaction._id,
      lenderUsername: req.user.username,
      itemId: req.notification.itemId,
      itemName: req.notification.itemName,
      pickUpTime: transaction.pickUpTime,
      dropOffTime: transaction.dropOffTime
    });
    borrowRequest.save();

    const borrower = await User.findById(transaction.borrowerId)
    borrower.notifications.push({ notification: borrowRequest._id, notificationType: "BorrowRequest" });
    // NOTE: following line returns borrower karma if declined
    borrower.karma = req.body.status === "declined" ? borrower.karma + transaction.price : borrower.karma
    await borrower.save();


    // == update transaction status to active == 
    transaction.status = req.body.status;
    await transaction.save();

    // == send socket notification to borrower ==
    const notification = await borrowRequest.populate({ path: "transaction" }).populate({ path: "itemLocation", select: "primaryLocation -_id" }).execPopulate()

    if (borrower.isLoggedIn && borrower.socketId) {
      socket.emitNotification({ notification, notificationType: "BorrowRequest" }, borrower.socketId)

      if (transaction.status === "declined") {
        socket.emitKarma(transaction.price, borrower.socketId)
      }

    } else {
      const status = transaction.status === 'declined' ? 'Declined' : 'Accepted'
      sendTextEmail(borrower.email, `Borrow Request ${status}`, borrowRequestText(notification, borrower.username, status))
    }

    if (transaction.status === 'active') {
      // == toggle item to unailable ==
      const item = await Item.findById(transaction.itemId)

      if (!item || !item.available) {
        throw new Error(!item ? `${req.notification.itemName} could not be found` : `${req.notification.itemName} is currently unavailableme`)
      }

      item.available = false
      await item.save()

      // == schedule agenda jobs ==
      const pickUpReminderTime = new Date(new Date(transaction.pickUpTime).getTime() - 60 * 60 * 24 * 1000)
      const dropOffReminderTime = new Date(new Date(transaction.dropOffTime).getTime() - 60 * 60 * 24 * 1000)
      const karmaPaymentTime = new Date(transaction.dropOffTime).getTime()

      agenda.schedule(pickUpReminderTime, "pick up reminder", { transactionId: transaction._id, itemName: req.notification.itemName })
      agenda.schedule(dropOffReminderTime, "drop off reminder", { transactionId: transaction._id, itemName: req.notification.itemName })
      agenda.schedule(karmaPaymentTime, "allocate karma", { transactionId: transaction._id, recipientId: transaction.lenderId })

      // == decline conflicting pending requests ==
      const conflictingTransactions = await Transaction.find({ itemId: transaction.itemId, status: "pending" }).populate("borrowerId").exec()
      conflictingTransactions.forEach(transaction => {
        transaction.status = "declined"
        transaction.save()

        // TODO: could potentially send socket notification to borrower here to update pending (now declined) notification in real time.

        // NOTE: following line returns borrower karma if declined
        transaction.borrowerId.karma = transaction.borrowerId.karma + transaction.price
        transaction.borrowerId.save()

        if (transaction.borrowerId.isLoggedIn && transaction.borrowerId.socketId) {
          socket.emitKarma(transaction.price, transaction.borrowerId.socketId)
        }
      })
    }

    const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate()
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;