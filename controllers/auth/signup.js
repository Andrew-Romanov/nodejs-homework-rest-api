const { Conflict, InternalServerError } = require('http-errors')
// const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) throw new Conflict('Email in use')
  // if (user) {
  //   res.status(409).json({
  //     status: 'Error',
  //     code: 409,
  //     message: 'Email in use'
  //   })
  //   return
  // }

  // const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // const userData = await User.create({ email, password: hashedPassword })
  const newUser = new User({ email })
  newUser.setPassword(password)
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
