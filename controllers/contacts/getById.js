const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  const { contactId } = req.params

  const contactData = await Contact
    .findOne({ _id: contactId, owner: req.user._id }, '_id name email phone favorite owner')
    .populate('owner', 'email subscription')

  if (!contactData) throw new NotFound(`Can't find contact with id ${contactId}`)

  res.status(200).json({
    status: 'Contact found',
    code: 200,
    data: {
      contactData
    }
  })
}

module.exports = getById
