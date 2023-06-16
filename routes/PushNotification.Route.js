const express= require('express')
const PushNotification = require('../models/PushNotification.Model')
const { pushNotification, getPushNotification } = require('../controllers/PushNotification.Controller')
const router = express.Router()

router.post('/',pushNotification)
router.get('/',getPushNotification)
module.exports = router