const mongoose = require('mongoose')

// https://stackoverflow.com/questions/22244421/how-to-create-mongoose-schema-with-array-of-object-ids

const notificationsSchema = new mongoose.Schema({
  seenIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
    default: []
  }],
  unseenIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
    default: []
  }],
  deletedIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
    default: []
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
})

// === virtuals ===
notificationsSchema.virtual('unseenNotifications', {
  ref: 'Transaction',
  localField: 'unseenIds',
  foreignField: '_id'
})

notificationsSchema.virtual('seenNotifications', {
  ref: 'Transaction',
  localField: 'seenIds',
  foreignField: '_id'
})

notificationsSchema.virtual('deletedNotifications', {
  ref: 'Transaction',
  localField: 'deletedIds',
  foreignField: '_id'
})

// === instance methods ===
notificationsSchema.methods.toJSON = function () {
  const notifications = this
  const notificationsObject = notifications.toObject()

  return notificationsObject
}

const Notifications = mongoose.model('Notifications', notificationsSchema)

module.exports = Notifications