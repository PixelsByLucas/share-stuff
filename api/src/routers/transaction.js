const express = require("express");
const router = new express.Router();
const LendingRequest = require("../models/notifications/lendingRequest")
const BorrowRequest = require('../models/notifications/borrowRequest')
const Transaction = require("../models/transaction");
const User = require("../models/user")
const Item = require("../models/item")
// const Notifications = require("../models/notifications/notifications")
const verifyNotification = require('../middleware/verifyNotification')
const auth = require("../middleware/auth");
const socket = require("../sockets/socket");
const { path } = require("../server");
const { lendingRequestText, borrowRequestText } = require('../emails/body')
const sendTextEmail = require('../emails/send')

// === Create Lending Request ===
router.post(
  '/transaction',
  auth,
  async (req, res) => {
    req.body.borrowerId = req.user._id;
    req.body.status = 'pending'

    try {
      const item = await Item.findById(req.body.itemId)
      if (!item) {
        throw new Error({ message: 'Item does not exist' })
      }

      if (!item.available) {
        throw new Error({ message: 'Item is currently unavailable' })
      }

      // == create new transaction ==
      const transactionRequest = new Transaction(req.body);
      await transactionRequest.save();

      // == create new notification ==
      const { itemId, pickUpTime, dropOffTime, message } = req.body

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
      await lendingRequest.save();

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

      res.status(201).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
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
    borrower.save();


    // == update transaction status to active == 
    transaction.status = req.body.status;
    await transaction.save();

    // == send socket notification to borrower ==
    const notification = await borrowRequest.populate({ path: "transaction" }).populate({ path: "itemLocation", select: "primaryLocation -_id" }).execPopulate()

    if (borrower.isLoggedIn && borrower.socketId) {
      socket.emitNotification({ notification, notificationType: "BorrowRequest" }, borrower.socketId)
    } else {
      const status = transaction.status === 'declined' ? 'Declined' : 'Accepted'
      sendTextEmail(borrower.email, `Borrow Request ${status}`, borrowRequestText(notification, borrower.username, status))
    }

    const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate();
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = router;