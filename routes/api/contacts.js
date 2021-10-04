const express = require('express')

const { controllerWrapper } = require('../../mildlewares/controllerWrapper')
const { validation } = require('../../mildlewares/validation')
const { joiStrictSchema, joiOptionalSchema, joiStatusSchema } = require('../../models/contact')
const controllers = require('../../controllers/contacts')

const router = express.Router()

router.get('/', controllerWrapper(controllers.getAll))

router.get('/:contactId', controllerWrapper(controllers.getById))

router.post('/', validation(joiStrictSchema), controllerWrapper(controllers.add))

router.delete('/:contactId', controllerWrapper(controllers.deleteById))

router.patch('/:contactId', validation(joiOptionalSchema), controllerWrapper(controllers.updateById))

router.patch('/:contactId/favorite', validation(joiStatusSchema), controllerWrapper(controllers.updateStatusContact))

module.exports = router
