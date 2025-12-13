const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const pushNotificationSchema= mongoose.Schema({
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    message:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

function validatePushNotification(pushNotification){
    const schema= Joi.object({
        account_id: Joi.objectId().required(),
        message: Joi.string().required()
    })
    return schema.validate(pushNotification)
}

const PushNotification= mongoose.model('PushNotification', pushNotificationSchema)
module.exports= PushNotification
exports.validatePushNotification= validatePushNotification