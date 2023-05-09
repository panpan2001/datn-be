const { Account } = require('../models/Account.Model')
const { StudentRating, validateStudentRating } = require('../models/StudentRating.Model')

exports.createStudentRating = async (req, res, next) => {
    const { error } = validateStudentRating(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const name_teacher = await Account.findOne({ full_name: req.body.name_teacher })
    if (!name_teacher) res.status(404).send("The teacher doesn't exist")
    else {
        const studentRating = new StudentRating({
            name_teacher: req.body.name_teacher,
            rating_avg_teacher: req.body.rating_avg_teacher,
            rating_content_1: req.body.rating_content_1,
            rating_content_2: req.body.rating_content_2,
            rating_content_3: req.body.rating_content_3,
            rating_content_4: req.body.rating_content_4,
            comment: req.body.comment
        })
        await studentRating.save()
        res.send(studentRating)
    }
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

exports.updateStudentRating = async (req, res, next) => {

    const { error } = validateStudentRating(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const studentRating = await StudentRating.findByIdAndUpdate(req.params.id, {
        name_teacher: req.body.name_teacher,
        rating_avg_teacher: req.body.rating_avg_teacher,
        rating_content_1: req.body.rating_content_1,
        rating_content_2: req.body.rating_content_2,
        rating_content_3: req.body.rating_content_3,
        rating_content_4: req.body.rating_content_4,
        comment: req.body.comment
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
