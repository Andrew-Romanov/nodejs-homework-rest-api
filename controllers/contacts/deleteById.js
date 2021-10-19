const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const deleteById = async (req, res, next) => {
  const { contactId } = req.params

  const result = await Contact.findByIdAndRemove({ _id: contactId, owner: req.user._id })

  if (!result) throw new NotFound(`Can't find contact with id ${contactId}`)

  res.status(200).json({
    status: 'Contact deleted',
    code: 200
  })
}

module.exports = deleteById
