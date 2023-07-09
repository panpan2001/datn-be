const express= require('express')
const router = express.Router()
const CourseController= require('../controllers/Course.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',CourseController.getAllCourses)

router.get('/:id',CourseController.getCourseById)

router.get('/teacher/:id',CourseController.getAllCoursesByIdTeacher)

router.post('/',middlewareController.verifyUserAndAdminAuth,CourseController.createCourse)

router.put('/:id',middlewareController.verifyUserAndAdminAuth,CourseController.updateCourse)

router.patch('/linkVideo/:id',middlewareController.verifyUserAndAdminAuth,CourseController.addLinkVideo)

router.patch('/changeAppearance/:id',middlewareController.verifyUserAndAdminAuth,CourseController.changeAppearanceCourse)

router.patch('/report/:id',middlewareController.verifyUserAndAdminAuth,CourseController.reportCourse)

router.patch('/deleteCourseReport/:id',middlewareController.verifyUserAndAdminAuth,CourseController.deleteCourseReport)

router.delete('/:id',middlewareController.verifyUserAndAdminAuth,CourseController.deleteCourse)

router.delete('/admin/:id',middlewareController.verifyUserAndAdminAuth,CourseController.adminDeleteCourse)

module.exports = router
