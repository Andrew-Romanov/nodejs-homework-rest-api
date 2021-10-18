const { InternalServerError } = require('http-errors')
const { User } = require('../../models')

const subscription = async (req, res, next) => {
  const { subscription } = req.body

  const userData = await User
    .findByIdAndUpdate(req.user._id, { subscription }, { new: true })

  if (!userData) throw new InternalServerError('Server error')

  res.status(200).json({
    status: 'User subscription updated',
    code: 200,
    data: {
      user: {
        email: userData.email,
        subscription: userData.subscription
      }
    }
  })
}

module.exports = subscription
