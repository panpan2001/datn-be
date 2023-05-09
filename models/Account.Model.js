const mongoose= require('mongoose')
const Joi= require('joi')

const accountSchema= mongoose.Schema({
    role_name:{
        type: String,
        ref: 'Role',
        required: true,
    },
    full_name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required: true,
        minlength:3,
    },
    email: { 
        type: String, 
        required: true,
        unique:true
    },
    phone_number:{
        type:String,
        required: true,
        minlength:10,
        maxlength:20
    },
    password:{
        type: String,
        required: true,
        minlength:6,
    },
    is_deleted:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
    }
},{
    timestamps: true
})

function validateAccount(account){
    const schema= Joi.object({
        role_name: Joi.string().required(),
        full_name: Joi.string().min(3).max(50).required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.string().required(),
        address: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone_number:Joi.string().min(10).max(20).required(),
        password: Joi.string().min(6).required(),
        is_deleted:Joi.boolean(),
        avatar:Joi.string()
    })
    return schema.validate(account)
}

const Account= mongoose.model("Account",accountSchema)
exports.Account = Account
exports.validateAccount= validateAccount