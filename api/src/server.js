const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const notificationsRouter = require('./routers/notifications')
const transactionRouter = require('./routers/transaction')
const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(itemRouter)
app.use(notificationsRouter)
app.use(userRouter)
app.use(transactionRouter)


app.listen(port, () => {
  console.log('server listening on port: ', port)
})