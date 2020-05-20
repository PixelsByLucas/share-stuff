const express = require("express");
const router = new express.Router();
const Transaction = require("../models/transaction");
const BorrowRequest = require("../models/notifications/borrowRequest")
const User = require("../models/user")
// const Notifications = require("../models/notifications/notifications")
const auth = require("../middleware/auth");

// === Create Borrow Request ===
router.post(
  '/transactions',
  auth,
  async (req, res) => {
    req.body.borrowerId = req.user._id;
    req.body.status = 'pending'

    try {

      console.log('HIT')
      // == create new transaction ==
      const transactionRequest = new Transaction(req.body);
      console.log('TRANSACTION REQ', transactionRequest)
      await transactionRequest.save();

      // == create new notification ==
      const { itemId, pickUpDate, pickUpTime, dropOffDate, dropOffTime, message } = req.body
      const borrowRequestData = {
        borrowerUsername: req.user.username,
        transactionId: transactionRequest._id,
        itemId,
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime,
        message
      }

      const borrowRequest = new BorrowRequest(borrowRequestData);
      await borrowRequest.save();

      // == associate notification with lender ==
      const lender = await User.findById(req.body.lenderId)
      lender.notifications.push({ notification: borrowRequest._id, notificationType: "BorrowRequest" })
      console.log('LENDER', lender.notifications)
      await lender.save()

      res.status(201).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
)

router.get(
  '/transactions',
  auth,
  async (req, res) => {

  }
)

module.exports = router;