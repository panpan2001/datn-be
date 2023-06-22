const express= require('express')
const middwareSDK = require('../middlewares/middwareSDK')
const router = express.Router()
const {RoomController}= require('../controllers/Room.Controller')


router.post('/',middwareSDK.checkAuth,RoomController.createRoom)