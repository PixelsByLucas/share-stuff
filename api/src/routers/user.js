const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { uploadSingle } = require('../middleware/upload')
const sharp = require('sharp')

// === Create User ===
router.post('/users', uploadSingle.single('avatar'), async (req, res) => {
  req.body.avatar = await sharp(req.file.buffer).png().resize({ width: 250, height: 250 }).toBuffer()
  req.body.primaryLocation = JSON.parse(req.body.primaryLocation)
  req.body.lastNameInitial = req.body.lastName ? `${req.body.lastName.substring(0, 1).toUpperCase()}.` : ""


  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

// === Verify User email ===
router.post('/users/email', async (req, res) => {
  try {
    const emailInUse = await User.findOne({ email: req.body.email })

    if (!emailInUse) {
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

    if (!usernameInUse) {
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

// === Read User Avatar ===
router.get('/users/:id/avatar', async (req, res) => {

  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
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

// === Read User By Username ===
router.get('/users/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })

    if (user) {
      res.send(user)
    } else {
      res.status(404).send()
    }

  } catch (error) {
    res.status(400).send()
  }
})

// === Update User ===
router.patch('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['firstName', 'lastName', 'age', 'primaryLocation', 'email', 'bio']
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
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

// === Update User Rating ===
// TODO: We'll need to get a transaction id from completed trade to varify rating update

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