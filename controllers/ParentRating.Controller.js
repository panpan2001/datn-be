const { Account } = require("../models/Account.Model")
const { validateParentRating, ParentRating } = require("../models/ParentRating.Model")


exports.createParentRating = async (req, res, next) => {
    const {error}= validateParentRating(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const name_teacher= await Account.findOne({full_name: req.body.name_teacher})
    if(!name_teacher) return res.status(404).send("The teacher doesn't exist")
    else {
        const parentRating = new ParentRating({
        name_teacher: req.body.name_teacher,
        rating_avg_teacher: req.body.rating_avg_teacher,
        rating_content_1: req.body.rating_content_1,
        rating_content_2: req.body.rating_content_2,
        rating_content_3: req.body.rating_content_3,
        rating_content_4: req.body.rating_content_4,
        comment: req.body.comment
    })
    await parentRating.save()
    res.send(parentRating)
}

}

exports.getAllParentRatings = async (req, res, next) => {
    const parentRatings = await ParentRating.find()
    if (!parentRatings) res.status(404).send("The parent rating doesn't exist")
    else res.send(parentRatings)
}

exports.getParentRatingById = async (req, res, next) => {
    const parentRating = await ParentRating.findById(req.params.id)
    if (!parentRating) res.status(404).send("The parent rating doesn't exist")
    else res.send(parentRating)
}

exports.updateParentRating = async (req, res, next) => {
    const { error } = validateParentRating(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const parentRating = await ParentRating.findByIdAndUpdate(req.params.id, {
        name_teacher: req.body.name_teacher,
        rating_avg_teacher: req.body.rating_avg_teacher,
        rating_content_1: req.body.rating_content_1,
        rating_content_2: req.body.rating_content_2,
        rating_content_3: req.body.rating_content_3,
        rating_content_4: req.body.rating_content_4,
        comment: req.body.comment
    },
        { new: true })
    if (!parentRating) res.status(404).send("The parent rating doesn't exist")
    else res.send(parentRating)
}

exports.deleteParentRating = async (req, res, next) => {
    const parentRating = await ParentRating.findByIdAndDelete(req.params.id)
    if (!parentRating) res.status(404).send("The parent rating doesn't exist")
    else res.send(parentRating)
}