const mongoose = require('mongoose')

const borrowRequestSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
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
    value: 'borrowRequest'
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
})

// === instance methods ===
// borrowRequestSchema.methods.toJSON = function () {
//   const borrowRequest = this
//   const borrowRequestObject = borrowRequest.toObject()

//   return borrowRequestObject
// }

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema)

module.exports = BorrowRequest