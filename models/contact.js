const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
// })
// Turn off version field and turn on timestamps instead
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

const joiStrictSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const joiOptionalSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()
})
  .or('name', 'email', 'phone', 'favorite')
// .min(1)

const joiStatusSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  Contact,
  joiStrictSchema,
  joiOptionalSchema,
  joiStatusSchema
}
