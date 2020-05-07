const express = require("express");
const router = new express.Router();
const Transaction = require("../models/transaction");
const auth = require("../middleware/auth");

// === Create Borrow Request ===
router.post(
  '/transactions',
  auth,
  async (req, res) => {
    req.body.borrowerId = req.user._id;
    req.body.status = 'pending'

    const transaction = new Transaction(req.body);

    try {
      await transaction.save();
      res.status(201).send(transaction);
    } catch (error) {
      res.status(400).send(error);
    }
  }
)

module.exports = router;