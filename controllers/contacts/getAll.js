const { InternalServerError } = require('http-errors')

const { Contact } = require('../../models')

const getAll = async (req, res, next) => {
  const contactsData = await Contact.find()

  if (!contactsData) throw new InternalServerError("Can't read data from file")

  res.status(200).json({
    status: 'Contacts received',
    code: 200,
    data: {
      contactsData
    }
  })
}

module.exports = {
  getAll
}
