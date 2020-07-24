const User = require('../../models/user')
const DropOffReminder = require('../../models/notifications/dropOffReminder')
const Transaction = require('../../models/transaction')
const socket = require('../../sockets/socket')
const sendTextEmail = require('../../emails/send')
const { dropOffReminderText } = require('../../emails/body')
const agenda = require('../agenda')
// https://www.codementor.io/@miguelkouam/how-to-schedule-tasks-in-node-js-express-using-agenda-h8sdo6b9p

const dropOffReminder = agenda => {
  agenda.define("drop off reminder", async job => {
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


      // == create new drop off reminder for borrower ==
      const borrowerDropOffReminder = new DropOffReminder({
        transactionId,
        lenderUsername: lender.username,
        borrowerUsername: borrower.username,
        itemName
      })
      await borrowerDropOffReminder.save()
      borrower.notifications.push({ notification: borrowerDropOffReminder._id, notificationType: "DropOffReminder" })

      // == create new drop off reminder for lender ==
      const lenderDropOffReminder = new DropOffReminder({
        transactionId,
        lenderUsername: lender.username,
        borrowerUsername: borrower.username,
        itemName
      })
      await lenderDropOffReminder.save()
      lender.notifications.push({ notification: lenderDropOffReminder._id, notificationType: "DropOffReminder" })

      // == email/socket notification to borrower ==
      const borrowerNotification = await borrowerDropOffReminder.populate({ path: "transaction" }).execPopulate()

      if (borrower.isLoggedIn && borrower.socketId) {
        socket.emitNotification({ borrowerNotification, notificationType: "DropOffReminder" }, borrower.socketId)
      } else {
        sendTextEmail(borrower.email, 'Drop Off Reminder', borrowerDropOffReminderText(borrowerDropOffReminder))
      }

      // == email/socket notification to lender ==
      const lenderNotification = await lenderDropOffReminder.populate({ path: "transaction" }).execPopulate()
      if (lender.isLoggedIn && lender.socketId) {
        socket.emitNotification({ lenderNotification, notificationType: 'DropOffReminder' }, lender.socketId)
      } else {
        sendTextEmail(lender.email, 'Drop Off Reminder', lenderDropOffReminderText(lenderDropOffReminder))
      }
    } catch (error) {
      job.fail(error.message)
      await job.save()
    }
  })
}

// TODO: "TEST THE ABOVE"
module.exports = dropOffReminder