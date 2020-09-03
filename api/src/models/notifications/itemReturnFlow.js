const mongoose = require('mongoose')

const itemReturnFlowSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  lenderUsername: {
    type: String,
    required: true
  },
  borrowerUsername: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['unseen', 'seen', 'deleted'],
    default: 'unseen'
  },
  type: {
    type: String,
    value: 'itemReturnFlow'
  },
  itemName: {
    type: String,
    required: true
  },
  itemReturned: {
    type: String,
    enum: ["yes", "no", ""],
    default: ""
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// == virtuals ==
itemReturnFlowSchema.virtual('transaction', {
  ref: 'Transaction',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: true
})

// == instance methods ==
itemReturnFlowSchema.methods.toJSON = function () {
  const itemReturnFlow = this
  const itemReturnFlowObject = itemReturnFlow.toObject()

  return itemReturnFlowObject
}

const ItemReturnFlow = mongoose.model('ItemReturnFlow', itemReturnFlowSchema)

module.exports = ItemReturnFlow