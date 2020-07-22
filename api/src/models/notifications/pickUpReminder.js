const mongoose = require('mongoose')

const pickUpReminderSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  lenderUsername: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ['unseen', 'seen', 'deleted'],
    default: 'unseen'
  },
  type: {
    type: mongoose.Schema.Types.String,
    value: 'pickUpReminder'
  },
  itemName: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// === virtuals ===
pickUpReminderSchema.virtual('transaction', {
  ref: 'Transaction',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: true
})

pickUpReminderSchema.virtual('itemLocation', {
  ref: 'User',
  localField: 'lenderUsername',
  foreignField: 'username',
  justOne: true
})

// === instance methods ===
pickUpReminderSchema.methods.toJSON = function () {
  const pickUpReminder = this
  const pickUpReminderObject = pickUpReminder.toObject()

  return pickUpReminderObject
}

const PickUpReminder = mongoose.model('PickUpReminder', pickUpReminderSchema)

module.exports = PickUpReminder