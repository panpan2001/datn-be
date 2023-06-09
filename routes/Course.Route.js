const express= require('express')
const router = express.Router()
const CourseController= require('../controllers/Course.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',CourseController.getAllCourses)

router.get('/:id',CourseController.getCourseById)

router.get('/teacher/:id',CourseController.getAllCoursesByIdTeacher)

router.post('/',middlewareController.verifyToken,CourseController.createCourse)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,CourseController.updateCourse)

router.delete('/:id',middlewareController.verifyUserAndAdminAuth,CourseController.deleteCourse)

module.exports = router
