const express= require('express')
const router = express.Router()
const CourseController= require('../controllers/Course.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',CourseController.getAllCourses)

router.get('/:id',CourseController.getCourseById)

router.get('/teacher/:id',CourseController.getAllCoursesByIdTeacher)

router.post('/',middlewareController.verifyUserAndAdminAuth,CourseController.createCourse)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,CourseController.updateCourse)

router.delete('/:id',middlewareController.verifyUserAndAdminAuth,CourseController.deleteCourse)

router.delete('/admin/:id',middlewareController.verifyUserAndAdminAuth,CourseController.adminDeleteCourse)

module.exports = router
