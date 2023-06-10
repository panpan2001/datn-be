
const express= require('express')
const router = express.Router()
const DemoCourseController= require('../controllers/DemoCourse.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',DemoCourseController.getAllDemoCourse)

router.get('/:id',DemoCourseController.getDemoCourseById)

router.post('/',middlewareController.verifyUserAndAdminAuth,DemoCourseController.createDemoCourse)

router.put('/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.updateDemoCourse)

router.delete('/:id',middlewareController.verifyUserAndAdminAuth,DemoCourseController.deleteDemoCourse)

module.exports = router