const express= require('express')
const router = express.Router()
const RoleController= require('../controllers/Role.Controller')

router.get('/',RoleController.getRole)

router.get('/:id',RoleController.getRoleById)

router.post('/',RoleController.createRole)

router.put('/:id',RoleController.updateRole)

router.delete('/:id',RoleController.deleteRole)


module.exports = router