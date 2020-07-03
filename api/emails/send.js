const nodemailer = require('nodemailer')
const { toLocaleUpperCase } = require('../src/utils/unicodeLogo')

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

  transport.sendMail(email, (err, info) => {
    if (error) {
      console.log('EMAIL ERROR: ', error)
    } else {
      console.log('mail sent successfully')
      console.log(info)
    }
  })

}

module.exports = sendTextEmail