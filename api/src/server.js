// == Database ==
require('./db/mongoose')

const path = require('path')
const cors = require('cors')

// == Server ==
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('./sockets/sio').init(http)

const port = process.env.PORT || 3001

// == Routes ==
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const notificationsRouter = require('./routers/notifications')
const transactionRouter = require('./routers/transaction')

const unicodeLogo = require('./utils/unicodeLogo')
const socketAuth = require('./middleware/socketAuth')
const sockets = require('./sockets/socket')

// == Middleware ==
app.use(cors())
app.use(express.json())
app.use(itemRouter)
app.use(notificationsRouter)
app.use(userRouter)
app.use(transactionRouter)
io.use(socketAuth)

io.on('connection', async (socket) => {
  sockets.connect(socket.user, socket.id)

  socket.on('logout', () => {
    socket.disconnect()
  })

  socket.on('disconnect', () => {
    sockets.disconnect(socket.user)
  })

})

http.listen(port, () => {
  console.log(unicodeLogo)
  console.log('server listening on port: ', port)
})

module.exports = io