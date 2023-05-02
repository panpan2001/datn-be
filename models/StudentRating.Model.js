const mongoose= require('mongoose')
const Joi= require('joi')

const studentRatingSchema= mongoose.Schema({
    id_student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
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
    rating_content_4:{
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
function validateStudentRating(studentRating){
    const schema= Joi.object({
        id_student: Joi.object().required(),
        id_teacher: Joi.object().required(),
        rating_avg_teacher: Joi.number().min(0).max(5).required(),
        rating_content_1: Joi.number().min(0).max(5).required(),
        rating_content_2: Joi.number().min(0).max(5).required(),
        rating_content_3: Joi.number().min(0).max(5).required(),
        rating_content_4: Joi.number().min(0).max(5).required(),
        comment: Joi.string()
    })
    return schema.validate(studentRating)
}
const StudentRating= mongoose.model("StudentRating",studentRatingSchema)

exports.StudentRating= StudentRating
exports.validateStudentRating= validateStudentRating
