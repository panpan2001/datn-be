const mongoose= require('mongoose')
const Joi= require('joi')

const courseStudentSchema= mongoose.Schema({
    id_student:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }],
    id_course:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }]
})

function validateCourseStudent(courseStudent){
    const schema= Joi.object({
        id_student: Joi.array().items(Joi.object().required()),
        id_course: Joi.array().items(Joi.object().required())
    })
    return schema.validate(courseStudent)
}

const CourseStudent= mongoose.model('CourseStudent', courseStudentSchema)

exports.CourseStudent= CourseStudent
exports.validateCourseStudent= validateCourseStudent