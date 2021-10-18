const express = require('express')

const { controllerWrapper } = require('../../mildlewares/controllerWrapper')
const { validation } = require('../../mildlewares/validation')
const { authentication } = require('../../mildlewares/authentication')
const { joiStrictSchema, joiOptionalSchema, joiStatusSchema } = require('../../models/contact')
const controllers = require('../../controllers/contacts')

const router = express.Router()

router.get('/', authentication, controllerWrapper(controllers.getAll))

router.get('/:contactId', authentication, controllerWrapper(controllers.getById))

router.post('/', authentication, validation(joiStrictSchema), controllerWrapper(controllers.add))

router.delete('/:contactId', authentication, controllerWrapper(controllers.deleteById))

router.patch('/:contactId', authentication, validation(joiOptionalSchema), controllerWrapper(controllers.updateById))

router.patch('/:contactId/favorite', authentication, validation(joiStatusSchema), controllerWrapper(controllers.updateStatusContact))

module.exports = router
