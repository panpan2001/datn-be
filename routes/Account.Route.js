const express= require('express')
const router = express.Router()
const AccountController= require('../controllers/Account.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',middlewareController.verifyToken,AccountController.getAllAccounts)

router.get('/:id',AccountController.getAccountById)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,AccountController.updateAccount)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,AccountController.deleteAccount)

module.exports = router
