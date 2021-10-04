const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params

  const contactData = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })

  if (!contactData) throw new NotFound(`Can't find contact with id ${contactId}`)

  res.status(200).json({
    status: 'Contact updated',
    code: 200,
    data: {
      contactData
    }
  })
}

module.exports = {
  updateStatusContact
}
