const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

// === Create User ===
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch(err) {
    res.status(400).send(err)
  }
})

// === Verify User email ===
router.post('/users/email', async (req, res) => {
  try {
    const emailInUse = await User.findOne({ email: req.body.email })

    if(!emailInUse) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (err) {
    res.status(500).send()
  }
})

// === Verify User Username ===
router.post('/users/username', async (req, res) => {
  try {
    const usernameInUse = await User.findOne({ username: req.body.username })

    if(!usernameInUse) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (err) {
    res.status(500).send()
  }
})

// === Login User ===
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

// === Get User From Token ===
router.post('/users/userFromToken', auth, async (req, res) => {
  res.send(req.user)
})

// === Logout User ===
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// === Logout User All ===
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

const upload = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a .jpg, .jpeg or .png file'))
    }
    cb(undefined, true)
  }
})

// === Create Avatar ===
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).png().resize({ width: 250, height: 250 }).toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  console.log("AVATAR UPLOADED")
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

// === Read User Avatar ===
router.get('/users/:id/avatar', async (req, res) => {
  console.log("HIT", req.params.id)

  try {
    const user = await User.findById(req.params.id)
    console.log(user)
  
    if(!user || !user.avatar) {
      throw new Error()
    }
  
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (error) {
    res.status(400).send()
  }
})

// === Read User ===
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// === Update User ===
router.patch('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['firstName', 'lastName', 'age', 'location', 'email']
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates' })
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])

    await req.user.save()

    res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})

// === Delete Avatar ===
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

// === Delete User ===
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send()
  }
})



module.exports = router