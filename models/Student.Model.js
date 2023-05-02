const mongoose= require('mongoose')
const Joi= require('joi')

const studentSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        minlength:3
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
    id_rating_teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"StudentRating",
        require:true
    }
},{
    timestamps: true
})

function validateStudent(student){
    const schema= Joi.object({
        name: Joi.string().min(3).max(50).required(),
        account_id: Joi.object().required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.boolean().required(),
        address: Joi.string().min(3).required(),
        parent_name: Joi.string().min(3).required(),
        parent_phone_number: Joi.string().min(10).max(20).required(),
        date_of_birth: Joi.date().required(),
        id_rating_teacher: Joi.object().required()
    })
    return schema.validate(student)
}

const Student= mongoose.model("Student",studentSchema);

exports.Student=Student;
exports.validate=validateStudent