const { InternalServerError } = require('http-errors')

const { Contact } = require('../../models')

const getAll = async (req, res, next) => {
  let { page = 1, limit = 20, favorite = false } = req.query
  let contactsData

  page = parseInt(page)
  limit = parseInt(limit)
  favorite = JSON.parse(favorite)

  if (favorite === true) {
    contactsData = await Contact
      .find({ owner: req.user._id, favorite: true },
        '_id name email phone favorite owner',
        { skip: (page - 1) * limit, limit: limit })
      .populate('owner', 'email subscription avatarURL')
  } else if (favorite === false) {
    contactsData = await Contact
      .find({ owner: req.user._id },
        '_id name email phone favorite owner',
        { skip: (page - 1) * limit, limit: limit })
      .populate('owner', 'email subscription avatarURL')
  }

  if (!contactsData) throw new InternalServerError('Server error')

  res.status(200).json({
    status: 'Contacts received',
    code: 200,
    data: {
      contactsData
    }
  })
}

module.exports = getAll
