const express= require('express')
const router = express.Router()
const CourseCategortController= require('../controllers/CourseCategory.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',CourseCategortController.getAllCourseCategories)

router.get('/:id',CourseCategortController.getCourseCategoryById)

router.post('/',CourseCategortController.createCourseCategory)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,CourseCategortController.updateCourseCategory)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,CourseCategortController.deleteCourseCategory)

module.exports = router
