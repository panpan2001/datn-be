const express= require('express')
const router = express.Router()
const StudentRating= require('../controllers/StudentRating.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',StudentRating.getAllStudentRatings)

router.get('/:id',StudentRating.getStudentRatingById)

router.get('/student/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.getStudentRatingByStudentId)

router.get('/teacher/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.getStudentRatingByTeacherId)

router.post('/',middlewareController.verifyUserAndAdminAuth,StudentRating.createStudentRating)

router.put('/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.updateStudentRating)

router.patch('/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.updateStudentRatingPatch)

router.patch('/sendWarning/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.updateQualityOfStudentRating)

router.patch('/changeAppearance/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.changeAppearanceStudentRating)

router.delete('/:id',middlewareController.verifyUserAndAdminAuth,StudentRating.deleteStudentRating)    

module.exports = router
