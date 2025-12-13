const express= require('express')
const router = express.Router()
const TeacherDegreeController= require('../controllers/TeacherDegree.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',TeacherDegreeController.getTeacherDegree)

router.get('/:id',TeacherDegreeController.getTeacherDegreeById)

router.post('/',TeacherDegreeController.createTeacherDegree)

router.put('/:id',middlewareController.verifyUserAndAdminAuth,TeacherDegreeController.updateTeacherDegree)

router.patch('/:id',middlewareController.verifyUserAndAdminAuth,TeacherDegreeController.updateTeacherDegreeStatus)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherDegreeController.deleteTeacherDegree)

module.exports = router
