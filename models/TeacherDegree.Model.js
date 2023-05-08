const mongoose= require('mongoose')
const Joi= require('joi')

const teacherDegreeSchema= mongoose.Schema({
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
    degree_description:{
        type:String,
        default:"",
        minlength:3
    },
    degree_status:{
        type:Boolean,
        required: true
    },
},{
    timestamps: true
})

function validateTeacherDegree(teacherDegree){
    const schema= Joi.object({
        degree_name: Joi.string().min(3).required(),
        degree_period: Joi.string().min(3).required(),
        degree_level: Joi.string().min(3).required(),
        degree_evidence: Joi.string().min(3).required(),
        degree_description: Joi.string().required(),
        degree_status: Joi.boolean().required()
    })
    return schema.validate(teacherDegree)
}

const TeacherDegree= mongoose.model("TeacherDegree",teacherDegreeSchema)
exports.TeacherDegree = TeacherDegree
exports.validate= validateTeacherDegree
