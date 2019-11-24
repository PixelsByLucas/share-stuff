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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  media: {
    type: [imageSchema],
    validate(value) {
      if(value.length > 3) {
        throw new Error('You cannot upload more than 3 images per item')
      }
    }
  }
}, {
  timestamps: true
})

// === instance methods ===
itemSchema.methods.toJSON = function() {
  const item = this
  const itemObject = item.toObject()
  
  itemObject.media.forEach((image, index) => {
    delete itemObject.media[index].buffer
  });

  return itemObject
}

const Item = mongoose.model('Item', itemSchema)

module.exports = Item