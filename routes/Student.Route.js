const express= require('express')
const router = express.Router()
const StudentController= require('../controllers/Student.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',StudentController.getAllStudents)

router.get('/account/:id',StudentController.getStudentByAccountId)//for student to get their profile
// router.get('/checkaccount/:id',StudentController.getStudentByAccountId)
router.get('/:id',StudentController.getStudentById)//for all can get student id 

router.post('/:id',StudentController.createStudent)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,StudentController.updateStudent)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,StudentController.deleteStudent)

module.exports = router
