const mongoose= require('mongoose')
const Joi= require('joi')

const adminSchema= mongoose.Schema({
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    }
    
},{
    timestamps: true
})

function validateAdmin(admin){
    const schema= Joi.object({
        account_id: Joi.object().required(),
    })
    return schema.validate(admin)
}

const Admin= mongoose.model("Admin",adminSchema)
exports.Admin=Admin
exports.validateAdmin=validateAdmin