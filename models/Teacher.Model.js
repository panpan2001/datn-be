const mongoose= require('mongoose')
const Joi= require('joi')

const teacherSchema= mongoose.Schema({
    // personal_information
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
        type: String,
        required: true,
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    home_address:{
        type: String,
        required:true,
        minlength:3
    },
    personal_description:{
        type:String,
        default:"",
        trim: true
    },
    //academic_information
    university_name:{
        type:String,
        required:true,
        minlength:3
    },
    academic_major:{
        type:String,
        required:true,
        minlength:3
    },
    academic_period:{
        type:String,
        required:true,
        minlength:3
    },
    academic_evidence:{
        type:String,
        required:true,
        minlength:3
    },
    academic_description:{
        type:String,
        default:"",
        trim: true
    },
    academic_status:{
        type:Boolean,
        required: true
    },
   
    //degree information
    degree_name:{
        type:String,
        required: true,
        minlength:3
    },
    degree_period:{
        type:String,
        required: true,
        minlength:3
    },
    degree_level:{
        type:String,
        required: true
    },
    degree_evidence:{
        type:String,
        required: true,
        minlength:3
    },
    degree_status:{
        type:Boolean,
        required: true
    },
    personal_image:{
        type:String,
        required: true
    },
    id_student_rate:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"StudentRating",
        required: true
    },
    id_parent_rate:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ParentRating",
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
        name: Joi.string().min(3).max(50).required(),
        gender: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        home_address: Joi.string().min(3).required(),
        personal_description: Joi.string().required(),
        //academic_information
        university_name: Joi.string().min(3).required(),
        academic_major: Joi.string().min(3).required(),
        academic_period: Joi.string().min(3).required(),
        academic_evidence: Joi.string().min(3).required(),
        academic_description: Joi.string().required(),
        academic_status: Joi.boolean().required(),
        //degree information
        degree_name: Joi.string().min(3).required(),
        degree_period: Joi.string().min(3).required(),
        degree_level: Joi.string().min(3).required(),
        degree_evidence: Joi.string().min(3).required(),
        degree_status: Joi.boolean().required(),
        personal_image: Joi.string().required(),
        id_student_rate: Joi.object().required(),
        id_parent_rate: Joi.object().required(),
        id_course: Joi.object().required()
    })
    return schema.validate(teacher)
}

const Teacher= mongoose.model('Teacher', teacherSchema)

exports.Teacher = Teacher
exports.validateTeacher = validateTeacher