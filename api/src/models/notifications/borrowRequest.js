const mongoose = require('mongoose')

const borrowRequestSchema = new mongoose.Schema({
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
    value: 'borrowRequest'
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
});

// === virtuals ===
borrowRequestSchema.virtual('transaction', {
  ref: 'Transaction',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: true
})

borrowRequestSchema.virtual('itemLocation', {
  ref: 'User',
  localField: 'lenderUsername',
  foreignField: 'username',
  justOne: true
})

// === instance methods ===
borrowRequestSchema.methods.toJSON = function () {
  const borrowRequest = this
  const borrowRequestObject = borrowRequest.toObject()

  return borrowRequestObject
}

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema)

module.exports = BorrowRequest