const { Unauthorized, InternalServerError } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  const { email, password } = req.body
  let userData = await User.findOne({ email })

  if (!(userData && userData.comparePassword(password))) throw new Unauthorized('Email or password is wrong')
  if (!userData.verify) throw new Unauthorized('Email is not verified')

  const payload = { id: userData._id }
  const token = jwt.sign(payload, SECRET_KEY)

  userData = await User.findByIdAndUpdate(userData._id, { token }, { new: true })

  if (!userData) throw new InternalServerError('Server error')

  res.status(200).json({
    status: 'User logged in',
    code: 200,
    data: {
      token,
      user: {
        email: userData.email,
        subscription: userData.subscription,
        avatarURL: userData.avatarURL
      }
    }
  })
}

module.exports = login
