const User = require('../models/user')

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
    console.log('NOTIFICATION', notification, "ID", socketId)
  }
}

module.exports = sockets