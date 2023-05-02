const mongoose= require('mongoose')
const Joi= require('joi')

const accountSchema= mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength:6,
        // maxlength:50
    },
    phone_number:{
        type:String,
        required: true,
        minlength:10,
        maxlength:20
    },
    role_name:{
        type: String,
        ref: 'Role',
        required: true,
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
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone_number:Joi.string().min(10).max(20).required(),
        role_name: Joi.string().required(),
        is_deleted:Joi.boolean(),
        avatar:Joi.string()
    })
    return schema.validate(account)
}

const Account= mongoose.model("Account",accountSchema)
exports.Account = Account
exports.validate= validateAccount