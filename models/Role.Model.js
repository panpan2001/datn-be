const mongoose= require('mongoose')
const Joi= require('joi')

const roleSchema=mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        trim: true
    }
})

function validateRole(role){
    const schema= Joi.object({
        name: Joi.string().required()
    })
    return schema.validate(role)
}

const Role= mongoose.model("Role",roleSchema)

exports.Role=Role
exports.validate=validateRole