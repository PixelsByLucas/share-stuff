const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const express = require('express')

const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)


app.listen(port, () => {
  console.log('server listening on port: ', port)
})