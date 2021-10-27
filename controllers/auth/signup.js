const { Conflict, InternalServerError } = require('http-errors')
const { User } = require('../../models')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) throw new Conflict('Email in use')

  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.setAvatarURL(email)
  const userData = await newUser.save()

  if (!userData) throw new InternalServerError('Server error')

  res.status(201).json({
    status: 'User registered',
    code: 201,
    data: {
      userData
    }
  })
}

module.exports = signup
