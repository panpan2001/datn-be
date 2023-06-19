const { Account } = require('../models/Account.Model')
const { Student } = require('../models/Student.Model')
const { StudentRating, validateStudentRating } = require('../models/StudentRating.Model')
const { Teacher } = require('../models/Teacher.Model')

exports.createStudentRating = async (req, res, next) => {
    const { error } = validateStudentRating(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const id_teacher = await Teacher.findById(req.body.id_teacher)
    if (!id_teacher) res.status(404).send("The teacher doesn't exist")
    const id_student = await Student.findById(req.body.id_student)
    if (!id_student) res.status(404).send("The student doesn't exist")
    // else {
        const studentRating = new StudentRating({
            id_teacher:  req.body.id_teacher,
            id_student: req.body.id_student,
            rating_avg_teacher: req.body.rating_avg_teacher,
            rating_content_1: req.body.rating_content_1,
            rating_content_2: req.body.rating_content_2,
            rating_content_3: req.body.rating_content_3,
            rating_content_4: req.body.rating_content_4,
            comment: req.body.comment,
            // id_course: req.body.id_course,
            isDemo: req.body.isDemo
        })
        await studentRating.save()
        res.send(studentRating)
    // }
}

exports.getAllStudentRatings = async (req, res, next) => {
    const studentRatings = await StudentRating.find()
    if (!studentRatings) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRatings)
}

exports.getStudentRatingById = async (req, res, next) => {
    const studentRating = await StudentRating.findById(req.params.id)
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}
exports.getStudentRatingByStudentId = async (req, res, next) => {
    const studentRating = await StudentRating.find({id_student:req.params.id})
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}

exports.getStudentRatingByTeacherId = async (req, res, next) => {
    const studentRating = await StudentRating.find({id_teacher:req.params.id},{

    })
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}

exports.updateStudentRating = async (req, res, next) => {

    const { error } = validateStudentRating(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const studentRating = await StudentRating.findByIdAndUpdate(req.params.id, {
        id_teacher:  req.body.id_teacher,
        id_student: req.body.id_student,
        rating_avg_teacher: req.body.rating_avg_teacher,
        rating_content_1: req.body.rating_content_1,
        rating_content_2: req.body.rating_content_2,
        rating_content_3: req.body.rating_content_3,
        rating_content_4: req.body.rating_content_4,
        comment: req.body.comment,
        // id_course: req.body.id_course,
        isDemo: req.body.isDemo
    },
        { new: true })
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)

}

exports.deleteStudentRating = async (req, res, next) => {

    const studentRating = await StudentRating.findByIdAndDelete(req.params.id)
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}
