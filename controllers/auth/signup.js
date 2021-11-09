const { Conflict, InternalServerError } = require('http-errors')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) throw new Conflict('Email in use')

  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.setAvatarURL(email)
  newUser.setVerificationToken()
  const userData = await newUser.save()

  if (!userData) throw new InternalServerError('Server error')

  const emailData = {
    to: userData.email,
    subject: 'User registration confirmation',
    html: `<a href="http://localhost:3000/api/users/verify/${userData.verificationToken}" rel="nofollow noopener noreferrer" target="_blank">User registration confirmation</a>`
  }

  sendEmail(emailData)

  res.status(201).json({
    status: 'User registered',
    code: 201,
    data: {
      userData
    }
  })
}

module.exports = signup
