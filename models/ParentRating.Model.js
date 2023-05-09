const mongoose= require('mongoose')
const Joi= require('joi')

const ParentRatingSchema= mongoose.Schema({
    
    name_teacher:{
        type: mongoose.Schema.Types.String,
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
        name_teacher: Joi.string().required(),
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
exports.validateParentRating= validateParentRating