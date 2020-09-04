const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const Transaction = require("../models/transaction")
const Review = require("../models/review")
const User = require("../models/user")
const ItemReturnFlow = require("../models/notifications/itemReturnFlow")
const { findByIdAndUpdate } = require("../models/user")
const agenda = require('../jobs/agenda')

// == get reviews by username ==
router.get("/reviews/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('reviews.review').exec()

    res.send(user.reviews)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// == post review ==
router.post("/review", auth, async (req, res) => {
  try {
    if (!req.body.transactionId) {
      throw new Error('transactionId reqired but not provided')
    }

    const transaction = await Transaction.findById(req.body.transactionId).populate('itemId').exec()

    if (!transaction) {
      throw new Error(`No transaction found with the id: ${req.body.transactionId}`)
    }

    // == determine if user is involved in transaction ==
    if (req.user._id.toString() !== transaction.lenderId.toString() && req.user._id.toString() !== transaction.borrowerId.toString()) {
      throw new Error(`User is not involved in transaction with id: ${req.body.transactionId}`)
    }

    // == ensure that user has not previousle submitted review for this transaction ==
    const previousReview = await Review.findOne({ transaction: req.body.transactionId, reviewer: req.user._id })

    if (previousReview) {
      throw new Error('User has already submitted a review for this transaction')
    }

    const userIsBorrower = req.user._id.toString() === transaction.borrowerId.toString()

    const reviewData = {
      transaction: transaction._id,
      reviewerUsername: req.user.username,
      reviewer: req.user._id,
      reviewee: userIsBorrower ? transaction.lenderId : transaction.borrowerId,
      message: req.body.message || "",
      rating: req.body.rating
    }

    // == create new review ==
    const review = await new Review(reviewData)
    await review.save()

    // == update transaction with new review ==
    if (userIsBorrower) {
      await Transaction.updateOne({ _id: transaction._id }, { 'reviews.borrower': review._id })
    } else {
      await Transaction.updateOne({ _id: transaction._id }, { 'reviews.lender': review._id })
    }

    // == update reviewee with new review after 48 hours ==
    const fortyEightHrsFromNow = new Date(new Date().getTime() + 60 * 60 * 48 * 1000)
    // TODO: change job time to fortyEightHrsFromNow once testing complete
    agenda.schedule(new Date(), "apply review", { revieweeId: review.reviewee, reviewId: review._id, rating: review.rating })

    // == if user is lender, initiate itemReturnFlow for borrower ==
    if (!userIsBorrower) {
      const borrower = await User.findById(transaction.borrowerId)

      const itemReturnFlowData = {
        transactionId: transaction._id,
        lenderUsername: req.user.username,
        borrowerUsername: borrower.username,
        itemName: transaction.itemId.name,
      }
      const borrowerItemReturnFlow = await new ItemReturnFlow(itemReturnFlowData)
      await borrowerItemReturnFlow.save()

      borrower.notifications.push({ notification: borrowerItemReturnFlow, notificationType: "ItemReturnFlow" })
      await borrower.save()
    }

    // == get updated req.user and send it back ==
    const updatedUser = await req.user.populate({
      path: "notifications.notification",
      populate: [
        { path: "transaction" },
        { path: "itemLocation", select: "primaryLocation -_id" }]
    }).execPopulate()

    res.send(updatedUser)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = router