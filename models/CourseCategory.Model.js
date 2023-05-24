const mongoose= require('mongoose')
const Joi= require('joi')

const courseCategorySchema= mongoose.Schema({
    // id_course:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Course',
    //     required: true
    // }],
    type:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    level:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    description:{
        type:String,
        default:"",
        minlength:5
    },
    

},{
    timestamps: true
})

function validateCourseCategory(courseCategory){
    const schema= Joi.object({
        // id_course: Joi.array().items(Joi.object().required()),
        type: Joi.string().min(3).max(50).required(),
        level: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(5)
    })
    return schema.validate(courseCategory)
}

const CourseCategory= mongoose.model("CourseCategory",courseCategorySchema)

exports.CourseCategory= CourseCategory
exports.validateCourseCategory= validateCourseCategory