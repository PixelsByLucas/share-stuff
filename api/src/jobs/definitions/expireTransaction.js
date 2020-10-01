const Transaction = require('../../models/transaction')
const LendingRequest = require('../../models/notifications/lendingRequest')
const BorrowRequestExpired = require('../../models/notifications/borrowRequestExpired')
const User = require('../../models/user')
const socket = require('../../sockets/socket')

const expireTransaction = agenda => {
  agenda.define("expire transaction", async job => {
    try {
      const { transactionId, lendingRequestId } = job.attrs.data

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

      if (transaction.status === "pending") {
        // == expire transaction ==
        await Transaction.updateOne({ _id: transactionId }, { status: "expired" })

        // == send socket notification to lender ==
        const lendingRequest = await LendingRequest.findById(lendingRequestId).populate({ path: 'transaction' }).exec()

        if (lender.isLoggedIn && lender.socketId) {
          socket.emitExpiration(lendingRequest, lender.socketId)
        }

        // == create new BorrowRequest ==
        const borrowRequestExpired = new BorrowRequestExpired({
          transactionId,
          lenderUsername: lender.username,
          itemName: lendingRequest.itemName,
          pickUpTime: lendingRequest.pickUpTime,
          dropOffTime: lendingRequest.dropOffTime
        })

        await borrowRequestExpired.save()

        // == associate BorrowRequest with borrower ==
        borrower.notifications.push({ notification: borrowRequestExpired, notificationType: "BorrowRequestExpired" })
        await borrower.save()

        // == send socket notification to borrower ==
        if (borrower.isLoggedIn && borrower.socketId) {
          socket.emitNotification({ notification: borrowRequestExpired, notificationType: "BorrowRequestExpired" }, borrower.socketId)
        }
      }

    } catch (error) {
      job.fail(error.message)
      await job.save()
    }
  })
}

module.exports = expireTransaction