const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const courseSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseCategory',
        required: true,
    },
    description:{
        type:String,
        default:"",
        required: true,
        minlength:5
    },
    number_of_student:{
        type:Number,
        default:0,
        required: true
    },
    schedule:{
        type: [mongoose.Schema.Types.Date],// change ? 
        required: true
    },
    time_per_lesson:{
        type:Number,
        required:true,
        min:45,
        max:180
    },
    cost:{
        type:Number,
        required:true,
        min:100000,
        max:5000000
    }

},{
    timestamps: true
})

function validateCourse(course){
    const schema= Joi.object({
        name: Joi.string().min(3).max(50).required(),
        category_id: Joi.objectId().required(),
        number_of_student: Joi.number().required(),
        description: Joi.string().min(5).max(50).required(),
        schedule: Joi.array().items(Joi.date().required()),
        time_per_lesson: Joi.number().min(45).max(180).required(),
        cost: Joi.number().min(100000).max(5000000).required()
    })
    return schema.validate(course)
}

const Course= mongoose.model('Course', courseSchema)

exports.Course= Course
exports.validateCourse= validateCourse