
const express= require('express')
const router = express.Router()
const DemoCourseController= require('../controllers/DemoCourse.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',DemoCourseController.getAllDemoCourse)

router.get('/:id',DemoCourseController.getDemoCourseById)

router.get('/course/:id',DemoCourseController.getDemoCourseByCourseId)

router.get('/teacher/:id',DemoCourseController.getDemoCourseByTeacherId)

router.post('/',middlewareController.verifyUserAndAdminAuth,DemoCourseController.createDemoCourse)

router.put('/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.updateDemoCourse)

router.patch('/linkVideo/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.addLinkVideo)

router.patch('/changeAppearance/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.changeAppearanceDemoCourse)

router.patch('/report/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.sendReportDemoCourseMessage)

router.delete('/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.deleteDemoCourse)

router.delete('/admin/:id',DemoCourseController.adminDeleteDemoCourse)


module.exports = router