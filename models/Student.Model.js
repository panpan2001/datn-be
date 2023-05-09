const mongoose= require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const studentSchema= mongoose.Schema({
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    parent_name:{
        type: String,
        minlength:3
    },
    parent_phone_number:{
        type:String,
        required:true,
        minlength:10,
        maxlength:20
    },
    id_rating_teacher:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"StudentRating",
    }]
},{
    timestamps: true
})

function validateStudent(student){
    const schema= Joi.object({
        account_id: Joi.objectId().required(),
        parent_name: Joi.string().min(3).required(),
        parent_phone_number: Joi.string().min(10).max(20).required(),
        id_rating_teacher: Joi.array().items(Joi.objectId())
    })
    return schema.validate(student)
}

const Student= mongoose.model("Student",studentSchema);

exports.Student=Student;
exports.validateStudent=validateStudent