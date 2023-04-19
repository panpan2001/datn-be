const mongoose= require('mongoose')
const Joi= require('joi')

const teacherSchema= mongoose.Schema({
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    gender:{
        type: Boolean,
        required: true,
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    home_address:{
        type: String,
        required:true,
        minlength:5
    },
    company_address:{
        type: String,
        required:true,
        minlength:5
    },
    academic_level:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"",
        trim: true
    },
    personal_image:{
        type:String,
        required: true
    },
    degree_image:{
        type:String,
        required: true
    },
    degree_status:{
        type:Boolean,
        required: true
    },
    student_rate:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"StudentRating",
        required: true
    },
    parent_rate:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ParentRating",
        required: true
    },
    account_status:{
        type:Boolean,
        required: true
    },
    id_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }


},{
    timestamps: true
})

function validateTeacher(teacher){
    const schema= Joi.object({
        account_id: Joi.object().required(),
        name: Joi.string().required().min(3).max(50),
        gender: Joi.boolean().required(),
        date_of_birth: Joi.date().required(),
        home_address: Joi.string().required().min(5),
        company_address: Joi.string().required().min(5),
        academic_level: Joi.string().required(),
        description: Joi.string().required().min(5),
        personal_image: Joi.string().required(),
        degree_image: Joi.string().required(),
        degree_status: Joi.boolean().required(),
        student_rate: Joi.object().required(),
        parent_rate: Joi.object().required(),
        account_status: Joi.boolean().required()
    })
    return schema.validate(teacher)
}

const Teacher= mongoose.model('Teacher', teacherSchema)

exports.Teacher = Teacher
exports.validateTeacher = validateTeacher