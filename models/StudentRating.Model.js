const mongoose= require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const AutoIncrement = require('mongoose-sequence')(mongoose);
const studentRatingSchema= mongoose.Schema({
   
    id_teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    id_student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    id_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
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
    },
    isDemo:{
        type: Boolean,
        default: false
    },
    isBadJudge:{
        type: Boolean,
        default: false
    },
    countBadJudge:{
        type: Number,
        default: 0
    },
    messageFromSystem:[{
        type:String,
        default:""
    }],
    studentUpdatedAt:{
        type:String,
        default:""
    }
},{
    timestamps: true
})
function validateStudentRating(studentRating){
    const schema= Joi.object({
        id_teacher: Joi.objectId().required(),
        id_student: Joi.objectId().required(),
        rating_avg_teacher: Joi.number().min(0).max(5).required(),
        rating_content_1: Joi.number().min(0).max(5).required(),
        rating_content_2: Joi.number().min(0).max(5).required(),
        rating_content_3: Joi.number().min(0).max(5).required(),
        rating_content_4: Joi.number().min(0).max(5).required(),
        comment: Joi.string(),
        id_course: Joi.objectId().required(),
        isDemo: Joi.boolean(),
        isBadJudge: Joi.boolean(),
        countBadJudge: Joi.number(),
        messageFromSystem: Joi.array().items(Joi.string()),
        studentUpdatedAt: Joi.string()
    })
    return schema.validate(studentRating)
}
const StudentRating= mongoose.model("StudentRating",studentRatingSchema)
studentRatingSchema.plugin(AutoIncrement,
     {inc_field: 'countBadJudge'}, 
     {disable_hooks: true},
     {start_seq: 0}
     );
exports.StudentRating= StudentRating
exports.validateStudentRating= validateStudentRating
