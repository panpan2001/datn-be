const express= require('express')
const router = express.Router()
const AccountController= require('../controllers/Account.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',middlewareController.verifyToken,AccountController.getAccount)

router.get('/:id',AccountController.getAccountById)

router.put('/:id',AccountController.updateAccount)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,AccountController.deleteAccount)

module.exports = router
