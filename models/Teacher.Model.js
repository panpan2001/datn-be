const mongoose= require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const teacherSchema= mongoose.Schema({
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    personal_description:{
        type:String,
        default:"",
        trim: true
    },
    
    personal_image:{
        type:String,
        required: true
    },
    id_student_rate:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"StudentRating",
        // required: true
    }],
    id_parent_rate:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ParentRating",
        // required: true
    }],
    id_course:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
    id_academic:
    // [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Academic',
        required: true,
        default:[]
     }
// ]
    ,
    id_degree:
    // [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: true
    }
// ]


},{
    timestamps: true
})

function validateTeacher(teacher){
    const schema= Joi.object({
        account_id: Joi.objectId().required(),
        personal_description: Joi.string().required(),
        personal_image: Joi.string().required(),
        id_student_rate: Joi.array().items(Joi.objectId()),
        id_parent_rate: Joi.array().items(Joi.objectId()),
        id_course: Joi.array().items(Joi.objectId()),
        id_academic: Joi.objectId().required(),
        // Joi.array().items(Joi.objectId().required()),
        id_degree: Joi.objectId().required()
        // Joi.array().items(Joi.objectId().required())
    })
    return schema.validate(teacher)
}

const Teacher= mongoose.model('Teacher', teacherSchema)

exports.Teacher = Teacher
exports.validateTeacher = validateTeacher