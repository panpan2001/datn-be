const mongoose= require('mongoose')
const Joi= require('joi')

const ParentRatingSchema= mongoose.Schema({
    id_student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    gender:{
        type: Boolean,
        required: true,
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
    id_teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    rating_avg_teacher:{
        type: Number,
        required: true,
        default:0,
        min:0,
        max:5
    },
    rating_content_1:{
        type: Number,
        required: true,
        default:0,
        min:0,
        max:5
    },
    rating_content_2:{
        type: Number,
        required: true,
        default:0,
        min:0,
        max:5
    },
    rating_content_3:{
        type: Number,
        required: true,
        default:0,
        min:0,
        max:5
    },
    comment:{
        type: String,
        trim: true
    }
},{
    timestamps: true
})

function validateParentRating(parentRating){
    const schema= Joi.object({
        id_student: Joi.object().required(),
        id_teacher: Joi.object().required(),
        name: Joi.string().required().min(3).max(50),
        gender: Joi.boolean().required(),
        email: Joi.string().email().required(),
        phone_number:Joi.number().minlength(10).maxlength(20).required(),
        rating_avg_teacher: Joi.number().min(0).max(5).required(),
        rating_content_1: Joi.number().min(0).max(5).required(),
        rating_content_2: Joi.number().min(0).max(5).required(),
        rating_content_3: Joi.number().min(0).max(5).required(),
        comment: Joi.string()
    })
    return schema.validate(parentRating)
}

const ParentRating= mongoose.model("ParentRating",ParentRatingSchema)

exports.ParentRating = ParentRating
exports.validate= validateParentRating