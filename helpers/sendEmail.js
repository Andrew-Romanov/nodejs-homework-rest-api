const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env

const sendEmail = async (emailData) => {
  sgMail.setApiKey(SENDGRID_API_KEY)

  // const email = {
  //   to: 'andrewromanov@yahoo.com',
  //   from: 'andrewromanov@ukr.net',
  //   subject: 'New registration request',
  //   html: '<p>New registration request</p>'
  // }

  const email = { ...emailData, from: 'andrewromanov@ukr.net' }

  await sgMail.send(email)

  // try {
  //   await sgMail.send(email)
  //   return true
  // } catch (error) {
  //   throw error
  // }
}

module.exports = sendEmail
