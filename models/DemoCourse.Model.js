const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const demoCourseSchema= mongoose.Schema({
    id_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    start_date:{
        type: String,
        required: true
    },
    end_date:{
        type: String,
        required: true
    },
    schedule:{
        type: String,// change ? 
        required: true
    },
    cost:{
        type:Number,
        required:true,
        min:20000,
        max:5000000

    },
    learning_period:{
        type:Number,
        required:true,
        min:1,
        max:5 
    },
    link_video:[{
        type: String,
        default:""
    }],
    link_meeting:[{
        type: String,
        default:""
    }],
    isHidden:{
        type: Boolean,
        default: false
    }
})

function validateDemoCourse(demoCourse){
    const schema= Joi.object({
        id_course: Joi.objectId().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        cost: Joi.number().min(20000).max(5000000).required(),
        schedule: Joi.string().required(),
        learning_period: Joi.number().min(1).max(5).required(),
        link_video: Joi.array().items(Joi.string()).required(),
        link_meeting: Joi.array().items(Joi.string()).required(),
        isHidden: Joi.boolean()
    })
    return schema.validate(demoCourse)
}

const DemoCourse= mongoose.model('DemoCourse', demoCourseSchema)
exports.DemoCourse= DemoCourse
exports.validateDemoCourse= validateDemoCourse