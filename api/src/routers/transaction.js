const express = require("express");
const router = new express.Router();
const Transaction = require("../models/transaction");
const Notifications = require("../models/notifications")
const auth = require("../middleware/auth");

// === Create Borrow Request ===
router.post(
  '/transactions',
  auth,
  async (req, res) => {
    req.body.borrowerId = req.user._id;
    req.body.status = 'pending'

    try {
      const transaction = new Transaction(req.body);
      await transaction.save();

      // == get lender notifications and push new transaction id ==
      let notifications = await Notifications.findOne({ userId: req.body.lenderId });

      if (notifications) {
        notifications.unseenIds.push(transaction._id)
      } else {
        notifications = new Notifications({ userId: req.body.lenderId })
        notifications.unseenIds.push(transaction._id)
      }

      await notifications.save()

      res.status(201).send(transaction);
    } catch (error) {
      res.status(400).send(error);
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