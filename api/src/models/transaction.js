const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  lenderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'rejected', 'active']
  },
  pickUpDate: {
    type: String,
    required: true,
  },
  pickUpTime: {
    type: String,
    required: true
  },
  dropOffDate: {
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

// === instance methods ===
transactionSchema.methods.toJSON = function () {
  const transaction = this
  const transactionObject = transaction.toObject()

  return transactionObject
}

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction