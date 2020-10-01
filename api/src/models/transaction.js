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
    ref: 'Item'
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'incomplete', 'declined', 'expired', 'active']
  },
  reviews: {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'Review'
    },
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'Review'
    }
  },
  pickUpTime: {
    type: Date,
    required: true,
    validate: [
      function (value) {
        if (value < new Date()) {
          throw new Error(`Pick up date and time must not be earlier than the present moment`)
        }
      }
    ]
  },
  dropOffTime: {
    type: Date,
    required: true,
    validate: [
      function (value) {
        if (this.pickUpTime > value) {
          throw new Error(`Drop off must not be earlier than pick up`)
        }
      }
    ]
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