const LendingRequest = require("../models/notifications/lendingRequest")
const BorrowRequest = require("../models/notifications/borrowRequest")
const PickUpReminder = require("../models/notifications/pickUpReminder")
const DropOffReminder = require("../models/notifications/dropOffReminder")
const ItemReturnFlow = require("../models/notifications/itemReturnFlow")
const User = require("../models/user");

const verifyNotification = async (req, res, next) => {
  try {
    // determine if notification belongs to user
    const notificationBelongsToUser = req.user.notifications.find(({ notification }) => notification.toString() === req.params.id);

    if (!notificationBelongsToUser) {
      throw new Error('Notification not found')
    }

    // fetch populated notification
    let notification

    switch (notificationBelongsToUser.notificationType) {
      case "LendingRequest":
        notification = await (await LendingRequest.findById(req.params.id)).populate({ path: "transaction" }).execPopulate();
        break;
      case "BorrowRequest":
        notification = await (await BorrowRequest.findById(req.params.id)).populate({ path: "transaction" }).execPopulate();
        break;
      case "PickUpReminder":
        notification = await (await PickUpReminder.findById(req.params.id)).populate({ path: "transaction" }).execPopulate();
        break;
      case "DropOffReminder":
        notification = await (await DropOffReminder.findById(req.params.id)).populate({ path: "transaction" }).execPopulate();
        break;
      case "ItemReturnFlow":
        notification = await (await ItemReturnFlow.findById(req.params.id)).populate({ path: "transaction" }).execPopulate();
        break;
      default:
        break;
    }

    req.notification = notification;
    next()

  } catch (error) {
    console.log('ERROR: ', error)
    res.status(401).send({ error: error.message });
  }
}

module.exports = verifyNotification