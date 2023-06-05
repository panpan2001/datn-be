const express= require('express')
const router = express.Router()
const DemoCourseStudentController= require('../controllers/DemoCourseStudent.Controller')
const middlewareController = require('../middlewares/middleware.Controller')


router.get('/',DemoCourseStudentController.getAllDemoCourseStudents)

router.get('/:id',DemoCourseStudentController.getDemoCourseStudentById)

router.post('/',middlewareController.verifyToken,DemoCourseStudentController.createDemoCourseStudent)

router.put('/:id',middlewareController.verifyToken,DemoCourseStudentController.updateDemoCourseStudent)

router.delete('/:id',middlewareController.verifyToken,DemoCourseStudentController.deleteDemoCourseStudent)

module.exports = router
