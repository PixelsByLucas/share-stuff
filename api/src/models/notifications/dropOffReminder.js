const mongoose = require('mongoose')

const dropOffReminderSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  lenderUsername: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  borrowerUsername: {
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
dropOffReminderSchema.virtual('transaction', {
  ref: 'Transaction',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: true
})

dropOffReminderSchema.virtual('itemLocation', {
  ref: 'User',
  localField: 'lenderUsername',
  foreignField: 'username',
  justOne: true
})

// === instance methods ===
dropOffReminderSchema.methods.toJSON = function () {
  const dropOffReminder = this
  const dropOffReminderObject = dropOffReminder.toObject()

  return dropOffReminderObject
}

const DropOffReminder = mongoose.model('DropOffReminder', dropOffReminderSchema)

module.exports = DropOffReminder