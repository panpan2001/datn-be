const express= require('express')
const router = express.Router()
const ParentController= require('../controllers/Parent.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',ParentController.getParent)

router.get('/:id',ParentController.getParentById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,ParentController.createParent)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,ParentController.updateParent)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,ParentController.deleteParent)

module.exports = router
