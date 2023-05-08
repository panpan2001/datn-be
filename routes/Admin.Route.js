const express= require('express')
const router = express.Router()
const AdminController= require('../controllers/Admin.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',middlewareController.verifyTokenAndAdminAuth,AdminController.getAdmin)

router.get('/:id',middlewareController.verifyTokenAndAdminAuth,AdminController.getAdminById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,AdminController.createAdmin)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,AdminController.deleteAdmin)
module.exports = router