const Transaction = require('../../models/transaction')
const User = require('../../models/user')
const itemReturnFlow = require('../../models/notifications/itemReturnFlow')
const socket = require('../../sockets/socket')

const itemReturn = agenda => {
  agenda.define("item return", async job => {
    try {
      const { transactionId, itemName } = job.attrs.data

      if (!transactionId) {
        throw new Error("transactionId wasn't provided for this job")
      }

      const transaction = await Transaction.findById(transactionId)

      if (!transaction) {
        throw new Error(`No transaction found with ID: ${transactionId}`)
      }

      const lender = await User.findById(transaction.lenderId)
      const borrower = await User.findById(transaction.borrowerId)

      if (!lender || !borrower) {
        throw new Error(!lender ? `Could not find lender with ID: ${transaction.lenderId}` : `Could not find borrower with with ID: ${transaction.borrowerId}`)
      }

      const itemReturnFlowNotification = new itemReturnFlow({
        transactionId,
        itemName,
        lenderUsername: lender.username,
        borrowerUsername: borrower.username
      })

      await itemReturnFlowNotification.save()
      lender.notifications.push({ notification: itemReturnFlowNotification._id, notificationType: "ItemReturnFlow" })
      await lender.save()

      await itemReturnFlowNotification.populate({ path: "transaction" }).execPopulate()

      // == email/socket notification to borrow ==
      if (lender.isLoggedIn && lender.socketId) {
        socket.emitNotification({ notification: itemReturnFlowNotification, notificationType: "ItemReturnFlow" }, lender.socketId)
      } else {
        // TODO: send email?
      }

    } catch (error) {
      job.fail(error.message)
      await job.save()
    }
  })
}

module.exports = itemReturn