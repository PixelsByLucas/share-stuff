const User = require('../../models/user')
const PickUpReminder = require('../../models/notifications/pickUpReminder')
const Transaction = require('../../models/transaction')
const socket = require('../../sockets/socket')
const sendTextEmail = require('../../emails/send')
const { borrowerPickUpReminderText, lenderPickUpReminderText } = require('../../emails/body')

const pickUpReminder = agenda => {
  agenda.define("pick up reminder", async job => {

    try {
      const { transactionId, itemName } = job.attrs.data

      if (!transactionId || !itemName) {
        throw new Error('Either transactionId or itemName was not provided to the job')
      }

      const transaction = await Transaction.findById(transactionId)

      if (!transaction) {
        throw new Error(`No transaction found with id: ${transactionId}`)
      }

      const borrower = await User.findById(transaction.borrowerId)
      const lender = await User.findById(transaction.lenderId)

      if (!borrower || !lender) {
        throw new Error(`Counld find borrower or lender for transaction with ID: ${transactionId}`)
      }

      // == create new pick up reminder for borrower ==
      const borrowerPickUpReminder = new PickUpReminder({
        transactionId,
        lenderUsername: lender.username,
        borrowerUsername: borrower.username,
        itemName
      })
      await borrowerPickUpReminder.save()
      borrower.notifications.push({ notification: borrowerPickUpReminder._id, notificationType: "PickUpReminder" })
      await borrower.save()

      // == create new pick up reminder for lender ==
      const lenderPickUpReminder = new PickUpReminder({
        transactionId,
        lenderUsername: lender.username,
        borrowerUsername: borrower.username,
        itemName
      })
      await lenderPickUpReminder.save()
      lender.notifications.push({ notification: lenderPickUpReminder._id, notificationType: "PickUpReminder" })
      await lender.save()

      // == email/socket notification to borrower ==
      const borrowerNotification = await borrowerPickUpReminder.populate({ path: "transaction" }).execPopulate()

      if (borrower.isLoggedIn && borrower.socketId) {
        socket.emitNotification({ borrowerNotification, notificationType: "PickUpReminder" }, borrower.socketId)
      } else {
        sendTextEmail(borrower.email, 'Pick Up Reminder', borrowerPickUpReminderText(borrowerPickUpReminder))
      }

      // == email/socket notification to lender ==
      const lenderNotification = await lenderPickUpReminder.populate({ path: "transaction" }).execPopulate()
      if (lender.isLoggedIn && lender.socketId) {
        socket.emitNotification({ lenderNotification, notificationType: 'PickUpReminder' }, lender.socketId)
      } else {
        sendTextEmail(lender.email, 'Pick Up Reminder', lenderPickUpReminderText(lenderPickUpReminder))
      }

    } catch (error) {
      job.fail(error.message)
      await job.save()
    }
  })
}

module.exports = pickUpReminder