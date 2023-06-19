const { validateCourseStudent, CourseStudent } = require("../models/CourseStudent.Model")
const {Student} = require("../models/Student.Model")
const {Course} = require("../models/Course.Model")
const { CourseCategory } = require("../models/CourseCategory.Model")
const { Account } = require("../models/Account.Model")
const { Teacher } = require("../models/Teacher.Model")

exports.createCourseStudent = async (req, res, next) => {
    console.log("create course student ")
    const courseStudent = new CourseStudent({
        id_student: req.body.id_student,
        id_course: req.body.id_course,
        isJudged: req.body.isJudged
    })
    await courseStudent.save()
    console.log("course student created: ",{courseStudent})
    res.send(courseStudent)
}

exports.getAllCourseStudents = async (req, res, next) => {
    const courseStudents = await CourseStudent.find()
    .populate('id_student',{
        createdAt: 0,
        updatedAt: 0,
        __v: 0

    })
    .populate('id_course',{
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    if(!courseStudents) res.status(404).send("The course student doesn't exist")
    else res.send(courseStudents)
}

exports.getCourseStudentById = async (req, res, next) => {
    
    const courseStudent = await CourseStudent.findById(req.params.id)
    .populate('id_student',{
        createdAt: 0,
        updatedAt: 0,
        __v: 0

    })
    .populate('id_course',{
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    if(!courseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(courseStudent)
}


exports.getCourseStudentByStudentId=async (req, res, next) => {
    const courseStudent = await CourseStudent.find({id_student:req.params.id})
    .populate('id_student',{
        createdAt: 0,
        updatedAt: 0,
        __v: 0

    })
    .populate([{
        path: 'id_course',
        // select: "id_course name category_id id_teacher ",
        populate:  [{
                path: 'category_id',
                model: CourseCategory,
                select: "_id category_name type level "
            },
            {
                path: 'id_teacher',
                model: Teacher,
                // select: "_id  ",
                populate: {
                    path: 'account_id',
                    model: Account,
                }
            }
        ]
    }])
    if(!courseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(courseStudent)

}

exports.updateCourseStudent = async (req, res, next) => {
    
    const {error}= validateCourseStudent(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const courseStudent = await CourseStudent.findByIdAndUpdate(req.params.id, {
        id_student: req.body.id_student,
        id_course: req.body.id_course,
        isJudged: req.body.isJudged
    },
     { new: true })
    if(!courseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(courseStudent)
}

exports.updateCourseStudentJudged = async (req, res, next) => {
    const courseStudent = await CourseStudent.findByIdAndUpdate(req.params.id, {
        isJudged: req.body.isJudged
    },
     { new: true })
    if(!courseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(courseStudent)
}

exports.deleteCourseStudent = async (req, res, next) => {
    const courseStudent = await CourseStudent.findByIdAndDelete(req.params.id)
    if(!courseStudent) res.status(404).send("The course student doesn't exist")
    else {
        const coursesStudent = await CourseStudent.find({id_student: courseStudent.id_student})
        res.send(coursesStudent)
    }
}