const mongoose= require('mongoose')
const Joi= require('joi')

const teacherAcademicSchema= mongoose.Schema({
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
        type:String,
        default:false,
        required: true
    },
   
},{
    timestamps: true
})

function validateTeacherAcademic(teacherAcademic){
    const schema= Joi.object({
        university_name: Joi.string().min(3).required(),
        academic_major: Joi.string().min(3).required(),
        academic_period: Joi.string().min(3).required(),
        academic_evidence: Joi.string().min(3).required(),
        academic_description: Joi.string().required(),
        academic_status: Joi.string().required()
    })
    return schema.validate(teacherAcademic)
}

const TeacherAcademic= mongoose.model("TeacherAcademic",teacherAcademicSchema)
exports.TeacherAcademic=TeacherAcademic
exports.validateTeacherAcademic=validateTeacherAcademic
