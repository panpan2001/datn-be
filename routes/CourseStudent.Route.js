const express= require('express')
const router = express.Router()
const CourseStudent= require('../controllers/CourseStudent.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',CourseStudent.getAllCourseStudents)

router.get('/:id',CourseStudent.getCourseStudentById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,CourseStudent.createCourseStudent)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,CourseStudent.updateCourseStudent)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,CourseStudent.deleteCourseStudent)

module.exports = router
