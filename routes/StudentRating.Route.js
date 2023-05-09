const express= require('express')
const router = express.Router()
const StudentRating= require('../controllers/StudentRating.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',StudentRating.getAllStudentRatings)

router.get('/:id',StudentRating.getStudentRatingById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,StudentRating.createStudentRating)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,StudentRating.updateStudentRating)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,StudentRating.deleteStudentRating)    

module.exports = router
