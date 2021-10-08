const { InternalServerError } = require('http-errors')
const { Contact } = require('../../models')

const add = async (req, res, next) => {
  const contactData = await Contact.create(req.body)

  if (!contactData) throw new InternalServerError('Server error')

  res.status(201).json({
    status: 'Contact added',
    code: 201,
    data: {
      contactData
    }
  })
}

module.exports = {
  add
}
