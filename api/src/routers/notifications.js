const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const verifyNotification = require("../middleware/verifyNotification")
const BorrowRequest = require("../models/notifications/borrowRequest")
const User = require("../models/user")

// === Read Notifications ===
router.put("/notification/status/:id", auth, verifyNotification, async (req, res) => {
  try {
    req.notification.status = "seen"
    await req.notification.save()
    console.log('req.notification', req.notification)

    const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate();
    console.log("USER", user)
    res.send(user)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/notification/borrow/decline/:id", auth, verifyNotification, async (req, res) => {
  try {
    const { transaction } = req.notification;
    if (transaction.status !== "pending") {
      throw new Error(`${transaction.status} transactions cannot be declined`);
    }

    transaction.status = "declined";
    transaction.save();

    const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate();
    res.send(user)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.put("/notification/borrow/accept/:id", auth, verifyNotification, async (req, res) => {
//   try {
//     const { transaction } = req.notification;
//     if (transaction.status !== "pending") {
//       throw new Error(`${transaction.status} transactions cannot be accepted`);
//     }

//     // == Send borrowRequest notification to borrower ==
//     const borrowRequest = new BorrowRequest({
//       transactionId: transaction._id,
//       lenderUsername: req.user.username,
//       itemId: req.notification.itemId,
//       itemName: req.notification.itemName,
//       pickUpTime: transaction.pickUpTime,
//       dropOffTime: transaction.dropOffTime
//     });
//     borrowRequest.save();

//     const borrower = await User.findById(transaction.borrowerId)
//     borrower.notifications.push({ notification: borrowRequest._id, notificationType: "BorrowRequest" });
//     borrower.save();
//     // TODO: Test the above
//     // TODO: Complete borrowRequestDeclined for /notification/borrow/decline/:id

//     // == Update transaction status to active == 
//     transaction.status = "active";
//     transaction.save();

//     const user = await req.user.populate({ path: "notifications.notification", populate: { path: "transaction" } }).execPopulate();
//     res.send(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// })

module.exports = router;