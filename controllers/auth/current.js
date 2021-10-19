const { InternalServerError } = require('http-errors')
const { User } = require('../../models')

const current = async (req, res, next) => {
  const userData = await User.findById(req.user._id)

  if (!userData) throw new InternalServerError('Server error')

  res.status(200).json({
    status: 'User data retrieved',
    code: 200,
    data: {
      user: {
        email: userData.email,
        subscription: userData.subscription
      }
    }
  })
}

module.exports = current
