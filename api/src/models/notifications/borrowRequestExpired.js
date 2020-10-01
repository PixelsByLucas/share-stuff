const mongoose = require('mongoose')

const borrowRequestExpiredSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  lenderUsername: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unseen', 'seen', 'deleted'],
    default: 'unseen'
  },
  type: {
    type: String,
    value: 'BorrowRequestExpired'
  },
  itemName: {
    type: String,
    required: true
  },
  pickUpTime: {
    type: String,
    required: true
  },
  dropOffTime: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// === virtuals ===
borrowRequestExpiredSchema.virtual('transaction', {
  ref: 'Transaction',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: true
})

// === instance methods ===
borrowRequestExpiredSchema.methods.toJSON = function () {
  const borrowRequestExpired = this
  const borrowRequestExpiredObject = borrowRequestExpired.toObject()

  return borrowRequestExpiredObject
}

const BorrowRequestExpired = mongoose.model('BorrowRequestExpired', borrowRequestExpiredSchema)

module.exports = BorrowRequestExpired