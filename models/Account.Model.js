const mongoose= require('mongoose')
const Joi= require('joi')

const accountSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength:3,
        maxlength:50
    },
    password:{
        type: String,
        required: true,
        minlength:6,
        maxlength:50
    },
    email: { 
        type: String, 
        required: true 
    },
    phone_number:{
        type:Number,
        required: true,
        minlength:10,
        maxlength:20
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
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
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().email().required(),
        phone_number:Joi.number().min(10).required(),
        role_id: Joi.required(),
        is_deleted:Joi.boolean(),
        avatar:Joi.string()
    })
    return schema.validate(account)
}

const Account= mongoose.model("Account",accountSchema)
exports.Account = Account
exports.validate= validateAccount