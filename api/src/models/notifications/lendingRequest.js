const mongoose = require('mongoose')

const lendingRequestSchema = new mongoose.Schema({
  borrowerUsername: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
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
    value: 'lendingRequest'
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  itemImageId: {
    type: mongoose.Schema.Types.ObjectId
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
  },
  message: {
    type: String,
    trim: true,
    validate(value) {
      if (value.length > 1000) {
        throw new Error('Message must be less than 1000 characters')
      }
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// === virtuals ===
lendingRequestSchema.virtual('transaction', {
  ref: 'Transaction',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: true
})

// === instance methods ===
lendingRequestSchema.methods.toJSON = function () {
  const lendingRequest = this
  const lendingRequestObject = lendingRequest.toObject()

  return lendingRequestObject
}

const LendingRequest = mongoose.model('LendingRequest', lendingRequestSchema)

module.exports = LendingRequest