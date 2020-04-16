const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  buffer: {
    type: Buffer
  }
})

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  available: {
    type: Boolean,
    default: true,
    required: true,
  },
  category: {
    type: String,
    default: 'Misc',
    required: true
  },
  price: {
    type: String,
    default: 0,
    required: true,
    validate(value) {
      if (typeof Number(value) !== 'number') {
        throw new Error('Price is not a number')
      }
      if (value < 0) {
        throw new Error('Price must be larger than 0')
      }
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  media: {
    type: [imageSchema],
    validate(value) {
      if (value.length > 3) {
        throw new Error('You cannot upload more than 3 images per item')
      }
    }
  }
}, {
  timestamps: true
})

// === instance methods ===
itemSchema.methods.toJSON = function () {
  const item = this
  const itemObject = item.toObject()

  // TODO: Can I just delete itemObject.media entirely?
  itemObject.media.forEach((image, index) => {
    delete itemObject.media[index].buffer
  });

  return itemObject
}

const Item = mongoose.model('Item', itemSchema)

module.exports = Item