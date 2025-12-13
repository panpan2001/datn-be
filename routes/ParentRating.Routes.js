const express= require('express')
const router = express.Router()
const ParentRating= require('../controllers/ParentRating.Controller')
const middlewareController = require('../middlewares/middleware.Controller')

router.get('/',ParentRating.getAllParentRatings)

router.get('/:id',ParentRating.getParentRatingById)

router.post('/',middlewareController.verifyTokenAndAdminAuth,ParentRating.createParentRating)

router.put('/:id',middlewareController.verifyTokenAndAdminAuth,ParentRating.updateParentRating)

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,ParentRating.deleteParentRating)

module.exports = router