const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const demoCourseStudentSchema= mongoose.Schema({
    id_student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    id_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    start_date:{
        type: String,
        required:true
    },
    end_date:{
        type: String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
},{
    timestamps: true
})

function validateDemoCourseStudent(demoCourseStudent){
    const schema= Joi.object({
        id_student: Joi.objectId().name().required(),
        id_course: Joi.objectId().name().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required()
    })
    return schema.validate(demoCourseStudent)
}

const DemoCourseStudent= mongoose.model('DemoCourseStudent', demoCourseStudentSchema)
exports.DemoCourseStudent= DemoCourseStudent
exports.validateDemoCourseStudent= validateDemoCourseStudent