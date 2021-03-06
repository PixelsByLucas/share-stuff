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
    trim: true,
    validate(value) {
      if (value.length > 25) {
        throw new Error('Name must be less than 25 characters')
      }
    }
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length > 500) {
        throw new Error('Description must be less than 500 characters')
      }
    }
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
  ownerId: {
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// === virtuals ===
itemSchema.virtual('owner', {
  ref: 'User',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true
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