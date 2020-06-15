const mongoose = require('mongoose')

const borrowRequestDeclinedSchema = new mongoose.Schema({
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
    value: 'borrowRequestDeclined'
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
});

const BorrowRequestDeclined = mongoose.model('BorrowRequestDeclined', borrowRequestDeclinedSchema)

module.exports = BorrowRequestDeclined