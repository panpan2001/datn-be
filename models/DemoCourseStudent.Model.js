const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const demoCourseStudentSchema= mongoose.Schema({
    id_student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    id_demo_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DemoCourse',
        required: true
    },
    isJudged:{
        type: Boolean,
        default: false
    },
    isReported:{
        type: Boolean,
        default: false
    },
    reportedMessage:[{
        type: String,
        default: ''
    }],
    reportedDateTime:{
        type:String,
        default: ''
    },
    countReported:{
        type: Number,
        default: 0
    }
    
},{
    timestamps: true
})

function validateDemoCourseStudent(demoCourseStudent){
    const schema= Joi.object({
        id_student: Joi.objectId().required(),
        id_demo_course: Joi.objectId().required(),
        isJudged: Joi.boolean(),
        isReported: Joi.boolean(),
        reportedMessage: Joi.array().items(Joi.string()),
        reportedDateTime: Joi.string(),
        countReported: Joi.number()
    })
    return schema.validate(demoCourseStudent)
}

const DemoCourseStudent= mongoose.model('DemoCourseStudent', demoCourseStudentSchema)
exports.DemoCourseStudent= DemoCourseStudent
exports.validateDemoCourseStudent= validateDemoCourseStudent