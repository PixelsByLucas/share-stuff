const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 99,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  tokens: [{
    token: {
      type: String,
      require: true
    }
  }],
  avatar: {
    type: Buffer,
  },
  karma: {
    type: Number,
    default: 1000,
    required: true
  }
})

// === virtuals ===
userSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'owner'
})

// === instance methods ===
userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '24h' })

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// === model methods ===
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if(!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// === middleware ===
userSchema.pre('save', async function(next) {
  const user = this

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User