const mongoose= require('mongoose')
const Joi= require('joi')

const ParentRatingSchema= mongoose.Schema({
    id_parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
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
        id_parent: Joi.object().required(),
        id_teacher: Joi.object().required(),
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