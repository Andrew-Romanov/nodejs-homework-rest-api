const express = require('express')

const { controllerWrapper } = require('../../mildlewares/controllerWrapper')
const { validation } = require('../../mildlewares/validation')
const { authentication } = require('../../mildlewares/authentication')
const { upload } = require('../../mildlewares/upload')
const { joiSchema, joiSubscriptionSchema } = require('../../models/user')
const controllers = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(controllers.signup))

router.post('/login', validation(joiSchema), controllerWrapper(controllers.login))

router.post('/logout', authentication, controllerWrapper(controllers.logout))
// router.get('/logout', authentication, controllerWrapper(controllers.logout))

router.get('/current', authentication, controllerWrapper(controllers.current))

router.patch('/subscription', authentication, validation(joiSubscriptionSchema), controllerWrapper(controllers.subscription))

router.patch('/avatars', authentication, upload.single('avatar'), controllerWrapper(controllers.avatars))

module.exports = router
