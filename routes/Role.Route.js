const express= require('express')
const router = express.Router()
const RoleController= require('../controllers/Role.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',RoleController.getRole)

router.get('/:id',RoleController.getRoleById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,RoleController.createRole)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,RoleController.updateRole)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,RoleController.deleteRole)


module.exports = router