const mongoose= require('mongoose')
const Joi= require('joi')

const adminSchema= mongoose.Schema({
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
        required:true
    },
    address:{
        type: String,
        required: true,
        minlength:3,
    },
    date_of_birth:{
        type: Date,
        required: true
    }
},{
    timestamps: true
})

function validateAdmin(admin){
    const schema= Joi.object({
        account_id: Joi.object().required(),
        name: Joi.string().min(3).max(50).required(),
        gender: Joi.string().required(),
        address: Joi.string().min(3).required(),
        date_of_birth: Joi.date().required()
    })
    return schema.validate(admin)
}

const Admin= mongoose.model("Admin",adminSchema)
exports.Admin=Admin
exports.validate=validateAdmin