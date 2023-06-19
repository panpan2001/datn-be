const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const courseStudentSchema= mongoose.Schema({
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
    isJudged:{
        type: Boolean,
        default: false
    }
    
},{
    timestamps: true
})

function validateCourseStudent(courseStudent){
    const schema= Joi.object({
        id_student: Joi.objectId().required(),
        id_course: Joi.objectId().required(),
    })
    return schema.validate(courseStudent)
}

const CourseStudent= mongoose.model('CourseStudent', courseStudentSchema)

exports.CourseStudent= CourseStudent
exports.validateCourseStudent= validateCourseStudent