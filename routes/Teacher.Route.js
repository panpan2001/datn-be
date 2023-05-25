const express= require('express')
const router = express.Router()
const TeacherController= require('../controllers/Teacher.Controller')
const middlewareController = require('../middlewares/middleware.Controller')
const uploadCloud = require('../middlewares/uploadImage')

router.get('/',TeacherController.getAllTeachers)

router.get('/:id',TeacherController.getTeacherById)

router.get('/account/:id',TeacherController.getTeacherByAccountId)

router.post('/',TeacherController.createTeacher)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherController.updateTeacher)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,TeacherController.deleteTeacher)


module.exports = router

// ,uploadCloud.single('image')