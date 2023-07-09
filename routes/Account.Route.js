const express= require('express')
const router = express.Router()
const AccountController= require('../controllers/Account.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',AccountController.getAllAccounts)

router.get('/:id',AccountController.getAccountById)

router.patch('/:id',middlewareController.verifyTokenAndAdminAuth,AccountController.updateAccount)

router.patch('/changeStatus/:id',middlewareController.verifyUserAndAdminAuth,AccountController.updateAccountStatus)

router.patch('/changeSeenMessage/:id',middlewareController.verifyUserAndAdminAuth,AccountController.changeSeenMessage)

router.patch('/deleteSeenMessage/:id',middlewareController.verifyUserAndAdminAuth,AccountController.deleteSeenMessage)


router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,AccountController.deleteAccount)

module.exports = router
