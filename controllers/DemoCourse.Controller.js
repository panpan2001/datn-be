const { Course } = require("../models/Course.Model")
const { DemoCourse, validateDemoCourse } = require("../models/DemoCourse.Model")
const { DemoCourseStudent } = require("../models/DemoCourseStudent.Model")


exports.createDemoCourse = async (req, res, next) => {
    const { error } = validateDemoCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = await Course.findById(req.body.id_course)
    if (!course) res.status(404).send("The course doesn't exist")
    const demoCourse = new DemoCourse({
        id_course: req.body.id_course,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cost: req.body.cost,
        learning_period: req.body.learning_period,
        schedule: req.body.schedule,
        link_video: req.body.link_video,
        link_meeting: req.body.link_meeting
    })
    if (!demoCourse) res.status(404).send("Can't create course")
    await demoCourse.save()
    res.send(demoCourse)
}

exports.getAllDemoCourse = async (req, res, next) => {
    const courses = await DemoCourse.find().populate('id_course', {
        start_date: 0,
        end_date: 0,
        cost: 0,
        learning_period: 0,
        schedule: 0,
        link_video: 0,
        link_meeting: 0
    })
    if (!courses) res.status(404).send("The course doesn't exist")
    else res.send(courses)
}

exports.getDemoCourseById = async (req, res, next) => {
    const course = await DemoCourse.findById(req.params.id).populate('id_course', {
        start_date: 0,
        end_date: 0,
        cost: 0,
        learning_period: 0,
        link_video: 0,
        link_meeting: 0
    })
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}

exports.getDemoCourseByCourseId = async (req, res, next) => {
    // let course = await Course.find({ id_course: req.params.id })
    // course=course.map(item=>item._id)

    // if (!course) res.status(404).send("The course doesn't exist")

    const demoCourse = await DemoCourse.find({ id_course: req.params.id }).populate('id_course', {
        start_date: 0,
        end_date: 0,
        cost: 0,
        learning_period: 0,
        link_video: 0,
        link_meeting: 0
    })
    // console.log("demoCourse",{demoCourse})
    if (!demoCourse) res.status(404).send("The demo course doesn't exist")
    else res.send(demoCourse)
}

exports.getDemoCourseByTeacherId = async (req, res, next) => {
    let course = await Course.find({ id_teacher: req.params.id })
    course = course.map(item => item._id)

    if (!course) res.status(404).send("The course doesn't exist")

    const demoCourse = await DemoCourse.find({ id_course: { $in: course } }).populate('id_course', {
        start_date: 0,
        end_date: 0,
        cost: 0,
        learning_period: 0,
        link_video: 0,
        link_meeting: 0
    })
        .populate('id_course', {
            start_date: 0,
            end_date: 0,
            cost: 0,
            learning_period: 0,
            link_video: 0,
            link_meeting: 0
        })

    if (!demoCourse) res.status(404).send("The demo course doesn't exist")
    else res.send(demoCourse)
}

exports.updateDemoCourse = async (req, res, next) => {
    const { error } = validateDemoCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = await DemoCourse.findByIdAndUpdate(req.params.id, {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cost: req.body.cost,
        learning_period: req.body.learning_period,
        schedule: req.body.schedule,
        link_video: req.body.link_video,
        link_meeting: req.body.link_meeting
    }, { new: true })
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}

exports.deleteDemoCourse = async (req, res, next) => {
    // console.log("id  democourse delete", req.params.id)
    const demoCourse = await DemoCourse.findByIdAndDelete(req.params.id)
    // console.log({ demoCourse })
    // const demoCourseStudent = await DemoCourseStudent.findOne({ id_demo_course: req.params.id })
    // if (demoCourseStudent) {
        await DemoCourseStudent.deleteMany({ id_demo_course: req.params.id })
    // }
    if (!demoCourse) res.status(404).send("The course doesn't exist")
    else {
        const newDemoCourse = await DemoCourse.find({ id_course: demoCourse.id_course })
            .populate('id_course', {
                start_date: 0,
                end_date: 0,
                cost: 0,
                learning_period: 0,
                link_video: 0,
                link_meeting: 0
            })
        res.status(200).send(newDemoCourse)
        console.log({ newDemoCourse })
    }
}
exports.adminDeleteDemoCourse = async (req, res, next) => {
    // console.log("id  democourse delete",req.params.id)
    const demoCourse = await DemoCourse.findByIdAndDelete(req.params.id)
    // const demoCourse = await DemoCourse.findById(req.params.id)
    console.log("demo course id ", demoCourse._id )
    // const demoCourseStudent = await DemoCourseStudent.findOne({ id_demo_course: req.params.id })
    // console.log({ demoCourseStudent })
    // if (demoCourseStudent) {
        
       const a=  await DemoCourseStudent.deleteMany({ id_demo_course: req.params.id })
       console.log("a",a)
    // const test= await DemoCourseStudent.find({ id_demo_course: req.params.id })
    //    console.log("test",test,test.length)
    // }
    if (!demoCourse) res.status(404).send("The course doesn't exist")
    else {
        const newDemoCourse = await DemoCourse.find()
            .populate('id_course', {
                start_date: 0,
                end_date: 0,
                cost: 0,
                learning_period: 0,
                link_video: 0,
                link_meeting: 0
            })
        res.status(200).send(newDemoCourse)
        console.log("newDemoCourse.length:",newDemoCourse.length )
    }
}


// https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array 