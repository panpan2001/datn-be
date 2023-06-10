const { Course } = require("../models/Course.Model")
const { DemoCourse } = require("../models/DemoCourse.Model")


exports.createDemoCourse = async (req, res, next) => {
    const {error } = validateDemoCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const course= await Course.findById(req.body.id_course)
   if(!course) res.status(404).send("The course doesn't exist")
        const demoCourse = new DemoCourse({
            id_course: req.body.id_course,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            cost: req.body.cost,
            link_video: req.body.link_video,
            link_meeting: req.body.link_meeting
        })
        if(!demoCourse) res.status(404).send("Can't create course")
        await demoCourse.save()
        res.send(demoCourse)
}

exports.getAllDemoCourse = async (req, res, next) => {
    const courses = await DemoCourse.find().populate('id_course',{
        start_date:0,
        end_date:0,
        cost:0,
        link_video:0,
        link_meeting:0
    })
    if(!courses) res.status(404).send("The course doesn't exist")
    else res.send(courses)
}

exports.getDemoCourseById = async (req, res, next) => {
    const course = await DemoCourse.findById(req.params.id).populate('id_course',{
        start_date:0,
        end_date:0,
        cost:0,
        link_video:0,
        link_meeting:0
    })
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}

exports.updateDemoCourse = async (req, res, next) => {
    const { error } = validateDemoCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = await DemoCourse.findByIdAndUpdate(req.params.id, {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cost: req.body.cost,
        link_video: req.body.link_video,
        link_meeting: req.body.link_meeting
    }, { new: true })
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}

exports.deleteDemoCourse = async (req, res, next) => {
    const course = await DemoCourse.findByIdAndDelete(req.params.id)
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}