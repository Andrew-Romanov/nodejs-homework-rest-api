const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const updateById = async (req, res, next) => {
  const { contactId } = req.params

  // const contactData = await Contact.findByIdAndUpdate({_id: contactId}, req.body, { new: true })
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
  updateById
}
