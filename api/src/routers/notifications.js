const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const verifyNotification = require("../middleware/verifyNotification")
// const BorrowRequest = require("../models/notifications/borrowRequest")
const ItemReturnFlow = require("../models/notifications/itemReturnFlow")
const Transaction = require("../models/transaction")
const Item = require("../models/item")
// const User = require("../models/user")
const { findOneAndUpdate, updateOne } = require("../models/transaction")

// === Update Notification seen/unseen ===
router.put("/notification/status/:id", auth, verifyNotification, async (req, res) => {
  try {
    req.notification.status = "seen"
    await req.notification.save()

    const user = await req.user.populate({
      path: "notifications.notification",
      populate: [
        { path: "transaction" },
        { path: "itemLocation", select: "primaryLocation -_id" }]
    }).execPopulate();

    res.send(user)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// === Update Return Notification returned/not returned ===
router.put("/notifications/return/:id", auth, async (req, res) => {
  try {
    if (typeof req.body.itemReturned !== 'boolean') {
      throw new Error('Request must contain a boolean value called itemReturned')
    }

    // == determine if notification belongs to user ==
    const notificationBelongsToUser = req.user.notifications.find(({ notification }) => notification.toString() === req.params.id);

    if (!notificationBelongsToUser) {
      throw new Error('Notification not found')
    }

    const notification = await ItemReturnFlow.findById(req.params.id).populate('transaction').exec()

    if (!notification) {
      throw new Error(`No notification found with id ${req.params.id}`)
    }

    if (req.body.itemReturned === true) {
      notification.itemReturned = "yes"
      await notification.save()
      await Transaction.updateOne({ _id: notification.transactionId }, { status: "completed" })
      await Item.updateOne({ _id: notification.transaction.itemId }, { available: true })
    } else {
      notification.itemReturned = "no"
      await notification.save()
      await Transaction.updateOne({ _id: notification.transactionId }, { status: "incomplete" })
    }

    const user = await req.user.populate({
      path: "notifications.notification",
      populate: [
        { path: "transaction" },
        { path: "itemLocation", select: "primaryLocation -_id" }]
    }).execPopulate();

    res.send(user)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/notification/status/:id", auth, verifyNotification, async (req, res) => {
  try {
    if (req.notification.status === "pending" || req.notification.status === "active") {
      throw new Error(`${req.notification.status} notifications cannot be deleted`)
    }

    req.notification.status = "deleted"
    await req.notification.save()
    req.user.notifications = req.user.notifications.filter(({ notification }) => {
      return notification.toString() !== req.params.id
    })

    await req.user.save()

    const user = await req.user.populate({
      path: "notifications.notification",
      populate: [
        { path: "transaction" },
        { path: "itemLocation", select: "primaryLocation -_id" }]
    }).execPopulate();

    res.send(user)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router;