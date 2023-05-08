const express= require('express')
const router = express.Router()
const CourseCategortController= require('../controllers/CourseCategory.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',CourseCategortController.getCourseCategory)

router.get('/:id',CourseCategortController.getCourseCategoryById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,CourseCategortController.createCourseCategory)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,CourseCategortController.updateCourseCategory)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,CourseCategortController.deleteCourseCategory)

module.exports = router
