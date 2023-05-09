const express= require('express')
const router = express.Router()
const StudentController= require('../controllers/Student.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',StudentController.getAllStudents)

router.get('/:id',StudentController.getStudentById)

router.post('/:id',middlewareController.verifyTokenAndAdminAuth,StudentController.createStudent)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,StudentController.updateStudent)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,StudentController.deleteStudent)

module.exports = router
