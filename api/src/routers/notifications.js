const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const verifyNotification = require("../middleware/verifyNotification")
const BorrowRequest = require("../models/notifications/borrowRequest")
const User = require("../models/user")

// === Update Notification seen/unseen ===
router.put("/notification/status/:id", auth, verifyNotification, async (req, res) => {
  try {
    req.notification.status = "seen"
    await req.notification.save()

    const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate();
    res.send(user)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;