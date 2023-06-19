const express= require('express')
const router = express.Router()
const DemoCourseStudentController= require('../controllers/DemoCourseStudent.Controller')
const middlewareController = require('../middlewares/middleware.Controller')
const checkDemoCourseStudent = require('../middlewares/checkDemoCourseStudent')


router.get('/',DemoCourseStudentController.getAllDemoCourseStudents)

router.get('/student/:id',DemoCourseStudentController.getDemoCourseStudentByStudentId)

router.get('/demoCourse/:id',DemoCourseStudentController.getDemoCourseStudentByDemoCourseId)

router.get('/:id',DemoCourseStudentController.getDemoCourseStudentById)

router.post('/',middlewareController.verifyToken,checkDemoCourseStudent.checkDuplicateCourse,checkDemoCourseStudent.checkFullAccess,DemoCourseStudentController.createDemoCourseStudent)

router.put('/:id',middlewareController.verifyToken,DemoCourseStudentController.updateDemoCourseStudent)

router.patch('/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseStudentController.updateDemoCourseJudge)


router.delete('/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseStudentController.deleteDemoCourseStudent)

module.exports = router
