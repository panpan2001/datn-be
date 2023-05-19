const express= require('express')
const router = express.Router()
const TeacherAcademicController= require('../controllers/TeacherAcademic.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',TeacherAcademicController.getTeacherAcademic)

router.get('/:id',TeacherAcademicController.getTeacherAcademicById)

router.post('/',TeacherAcademicController.createTeacherAcademic)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherAcademicController.updateTeacherAcademic)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherAcademicController.deleteTeacherAcademic)

module.exports = router
