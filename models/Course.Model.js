const mongoose= require('mongoose')
const Joi= require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const courseSchema= mongoose.Schema({
    id_teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
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
        required: true,
        min:1,
        max:10
    },
    schedule:{
        type: String,// change ? 
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
    time_per_lesson:{
        type:Number,
        required:true,
        min:45,
        max:180
    },
    learning_period:{
        type:Number,
        required:true,
        min:1,
        max:12
    },
    cost:{
        type:Number,
        required:true,
        min:20000,
        max:5000000
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMV97UpeAbbPPiPpJz8iFsmgeusjg_pVfTscc75Hm18KTA6np6O7Tro2YAaooQDdqq_zk&usqp=CAU"
    },
    isDemoClass:{
        type:Boolean,
        default:false,
        required:true
    }
   
},{
    timestamps: true
})

function validateCourse(course){
    const schema= Joi.object({
        id_teacher: Joi.objectId().required(),
        name: Joi.string().min(3).max(50).required(),
        category_id: Joi.objectId().required(),
        number_of_student: Joi.string().required(),
        description: Joi.string().min(5).required(),
        schedule: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        time_per_lesson: Joi.string().required(),
        learning_period: Joi.string().required(),
        cost: Joi.number().min(20000).max(5000000).required(),
        image: Joi.string(),
        isDemoClass: Joi.boolean().required()
    })
    return schema.validate(course)
}

const Course= mongoose.model('Course', courseSchema)

exports.Course= Course
exports.validateCourse= validateCourse