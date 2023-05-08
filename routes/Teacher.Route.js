const express= require('express')
const router = express.Router()
const TeacherController= require('../controllers/Teacher.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',TeacherController.getTeacher)

router.get('/:id',TeacherController.getTeacherById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,TeacherController.createTeacher)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherController.updateTeacher)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherController.deleteTeacher)

module.exports = router