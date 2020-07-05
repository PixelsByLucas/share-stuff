const nodemailer = require('nodemailer')
const { toLocaleUpperCase } = require('../utils/unicodeLogo')

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const sendTextEmail = (recipient, title, message) => {

  const email = {
    from: 'fake-email@gmail.com',
    to: recipient,
    subject: title,
    text: message
  }

  transport.sendMail(email, (error, info) => {
    if (error) {
      console.log('EMAIL ERROR: ', error)
    } else {
      console.log(`mail sent successfully to ${info.accepted[0]}`)
    }
  })

}

module.exports = sendTextEmail