const mongoose= require('mongoose')
const Joi= require('joi')

const parentSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    gender:{
        type: String,
        required: true
    },
    phone_number:{
        type:String,
        required: true,
        minlength:10,
        maxlength:20
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true,
        minlength:3
    },
    child_name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:50
    },
    id_student:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true,

    }],
    id_rating_teacher:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ParentRating',
        required:true,

    }]

},{
    timestamps: true
})

function validateParent(parent){
    const schema= Joi.object({
        name: Joi.string().min(3).max(50).required(),
        gender: Joi.string().required(),
        phone_number: Joi.string().min(10).max(20).required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(3).required(),
        child_name: Joi.string().min(3).max(50).required(),
        id_student: Joi.array().items(Joi.object().required()),
        id_rating_teacher: Joi.array().items(Joi.object().required())
    })
    return schema.validate(parent)
}

const Parent= mongoose.model("Parent",parentSchema)
exports.Parent = Parent
exports.validateParent= validateParent