const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

// === Read Notifications ===
router.get("/notifications", auth, async (req, res) => {


  try {
    // const user = await User.findById(req.user._id).populate("notifications.notificationId")
    // user.populate

    // TODO: going to want to use populate here to get different kinds of notifications by userId.
    // Look into using refPath to populate from many different collections.






    // const notifications = await Notifications.findOne({ userId: req.user._id })

    // if (!notifications) {
    //   throw new Error("No notifications available")
    // }

    // await notifications.populate({ path: "unseenNotifications" }).execPopulate();
    // console.log('Notifications', notifications.unseenNotification)

    // if (!item) {
    //   return res
    //     .status(404)
    //     .send({ error: `Could not find item with id: ${req.params.id}` });
    // }

    // await item.populate({ path: "owner", select: "username primaryLocation rating -_id" }).execPopulate();

    res.send();
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;