const { InternalServerError } = require('http-errors')

const { Contact } = require('../../models')

const getAll = async (req, res, next) => {
  const contactsData = await Contact
    .find({ owner: req.user._id }, '_id name email phone favorite owner')
    .populate('owner', 'email subscription')

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
