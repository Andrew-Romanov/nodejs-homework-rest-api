const { NotFound } = require('http-errors')
const { User } = require('../../models/')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params

  const userData = await User.findOneAndUpdate({ verificationToken },
    { verificationToken: null, verify: true }, { new: true })

  if (!userData) throw new NotFound('User not found')

  res.status(200).json({
    status: 'User email verified',
    code: 200,
    message: 'Verification successful'
  })
}

module.exports = verify
