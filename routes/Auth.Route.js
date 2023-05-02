const express= require('express')
const authorizationController = require('../controllers/Auth.Controller')
const router = express.Router()

router.post('/register',authorizationController.registerUser)
router.post('/login',authorizationController.loginUser)

module.exports=router