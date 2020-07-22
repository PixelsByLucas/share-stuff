const User = require('../../models/user')
// const DropOffReminder = require('../../models/notifications/pickUpReminder')
const socket = require('../../sockets/socket')
const sendTextEmail = require('../../emails/send')
// const { dropOffReminderText } = require('../../emails/body')
const agenda = require('../agenda')
// https://www.codementor.io/@miguelkouam/how-to-schedule-tasks-in-node-js-express-using-agenda-h8sdo6b9p

const dropOffReminder = agenda => {
  agenda.define("drop off reminder", async job => {
    // const { } = job.attrs.data

  })
}

module.exports = dropOffReminder