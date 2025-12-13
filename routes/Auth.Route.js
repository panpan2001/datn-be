const express= require('express')
const authController = require('../controllers/Auth.Controller')
const middlewareController = require('../middlewares/middleware.Controller')
const checkAccessStatus = require('../middlewares/checkAccessStatus')
const router = express.Router()

router.post('/register',authController.registerUser)

router.post('/login',checkAccessStatus.checkIsBlocked,authController.loginUser)

router.post('/refresh',authController.requestRefreshToken)

router.post('/logout',middlewareController.verifyToken,authController.logoutUser)

module.exports=router