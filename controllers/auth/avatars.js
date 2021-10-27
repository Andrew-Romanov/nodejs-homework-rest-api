const { InternalServerError, BadRequest } = require('http-errors')
const Jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')

const avatars = async (req, res, next) => {
  if (!req.file) throw new BadRequest('Avatar image required')

  try {
    const [extension] = req.file.originalname.split('.').reverse()
    const avatarFileName = `avatar_${req.user._id}.${extension}`

    const jimpImage = await Jimp.read(req.file.path)
    await jimpImage.resize(250, 250).writeAsync(req.file.path)

    await fs.rename(req.file.path,
      path.join(__dirname, '../../public/avatars/', avatarFileName))

    const userData = await User
      .findByIdAndUpdate(req.user._id, { avatarURL: `/avatars/${avatarFileName}` }, { new: true })

    if (!userData) throw new InternalServerError('Server error')

    res.status(200).json({
      status: 'User avatar updated',
      code: 200,
      data: {
        user: {
          email: userData.email,
          subscription: userData.subscription,
          avatarURL: userData.avatarURL
        }
      }
    })
  } catch (error) {
    await fs.unlink(req.file.path)
    next(error)
  }
}

module.exports = avatars
