const { BadRequest, NotFound } = require('http-errors')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const sendAgain = async (req, res, next) => {
  const { email } = req.body

  if (!email) throw new BadRequest('Missing required field email')

  const userData = await User.findOne({ email })

  if (!userData) throw new NotFound('User not found')
  if (userData.verify) throw new BadRequest('Verification has already been passed')

  const emailData = {
    to: userData.email,
    subject: 'User registration confirmation',
    html: `<a href="http://localhost:3000/api/users/verify/${userData.verificationToken}" rel="nofollow noopener noreferrer" target="_blank">User registration confirmation</a>`
  }

  sendEmail(emailData)

  res.status(200).json({
    status: 'Email sent again',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = sendAgain
