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
    
},{
    timestamps: true
})

function validateDemoCourseStudent(demoCourseStudent){
    const schema= Joi.object({
        id_student: Joi.objectId().required(),
        id_demo_course: Joi.objectId().required(),
    })
    return schema.validate(demoCourseStudent)
}

const DemoCourseStudent= mongoose.model('DemoCourseStudent', demoCourseStudentSchema)
exports.DemoCourseStudent= DemoCourseStudent
exports.validateDemoCourseStudent= validateDemoCourseStudent