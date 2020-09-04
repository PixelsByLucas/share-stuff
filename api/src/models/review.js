const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Transaction'
  },
  reviewerUsername: {
    type: String,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    validate: [
      function (value) {
        if (value.length > 200) {
          throw new Error('Message must not be greater than 200 characters')
        }
      }
    ]
  },
  rating: {
    type: Number,
    required: true,
    validate: [
      function (value) {
        if (value < -1 || value > 1) {
          throw new Error(`Rating: ${value} is invalid`)
        }
      }
    ]
  }
}, {
  timestamps: true,
  // NOTE: currently no virtuals
  // toJSON: { virtuals: true },
  // toObject: { virtuals: true }
})

reviewSchema.methods.toJSON = function () {
  const review = this
  const reviewObject = review.toObject()

  return reviewObject
}

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review