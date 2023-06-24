const express= require('express')
const router = express.Router()
const CourseStudent= require('../controllers/CourseStudent.Controller')
const middlewareController = require('../middlewares/middleware.Controller')
const checkCourseStudent = require('../middlewares/checkCourseStudent')

router.get('/',CourseStudent.getAllCourseStudents)

router.get('/:id',CourseStudent.getCourseStudentById)

router.get('/student/:id',CourseStudent.getCourseStudentByStudentId)

router.post('/',
middlewareController.verifyUserAndAdminAuth,
checkCourseStudent.checkDuplicateCourse,
checkCourseStudent.checkFullAccess,
CourseStudent.createCourseStudent)

router.put('/:id',middlewareController.verifyUserAndAdminAuth,CourseStudent.updateCourseStudent)

router.patch('/:id',CourseStudent.updateCourseStudentJudged)


router.delete('/:id',middlewareController.verifyUserAndAdminAuth,CourseStudent.deleteCourseStudent)

module.exports = router
