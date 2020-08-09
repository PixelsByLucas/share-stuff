const Transaction = require("../../models/transaction")
const User = require("../../models/user")
const socket = require('../../sockets/socket')

const allocateKarma = agenda => {
  agenda.define("allocate karma", async job => {
    try {
      const { transactionId, recipientId } = job.attrs.data

      if (!transactionId || !recipientId) {
        throw new Error('TransactionId and/or recipientId were not provided to the job')
      }

      const transaction = await Transaction.findById(transactionId)

      if (!transaction) {
        throw new Error(`No transaction found with id: ${transactionId}`)
      }

      const recipient = await User.findById(recipientId)

      if (!recipient) {
        throw new Error(`Could not find recipient with ID: ${recipientId}`)
      }

      // == allocate Karma ==
      recipient.karma = recipient.karma + transaction.price
      recipient.save()

      // == socket allocate karma to recipient ==
      if (recipient.isLoggedIn && recipient.socketId) {
        socket.emitKarma(transaction.price, recipient.socketId)
      }

    } catch (error) {
      job.fail(error.message)
      await job.save()
    }
  })
}

module.exports = allocateKarma