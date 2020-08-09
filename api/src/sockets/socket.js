const User = require('../models/user')
const io = require('./sio').get()

const sockets = {
  async connect(user, socketId) {
    try {
      user.socketId = socketId
      user.isLoggedIn = true
      await user.save()
      console.log(`${user.username} logged IN`)
    } catch (error) {
      console.log('ERROR', error.message)
    }
  },
  async disconnect(user) {
    try {
      user.socketId = ""
      user.isLoggedIn = false
      await user.save()
      console.log(`${user.username} logged OUT`)
    } catch (error) {
      console.log('ERROR', error.message)
    }
  },
  emitNotification(notification, socketId) {
    io.to(socketId).emit('new notification', notification)
  },
  emitKarma(amount, socketId) {
    io.to(socketId).emit('karma', amount)
  }
}

module.exports = sockets