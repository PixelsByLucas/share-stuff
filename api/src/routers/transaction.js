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

// === Create Borrow Request ===
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

      res.status(201).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
)

// /transaction/status/

router.put("/transaction/status/:id", auth, verifyNotification, async (req, res) => {
  try {
    const { transaction } = req.notification;
    if (transaction.status !== "pending") {
      throw new Error(`${transaction.status} transactions cannot be accepted`);
    }

    // == Send borrowRequest notification to borrower ==
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

    // == Update transaction status to active == 
    transaction.status = req.body.status;
    transaction.save();

    const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate();
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = router;