const { Course } = require("../models/Course.Model")
const { DemoCourse } = require("../models/DemoCourse.Model")
const { DemoCourseStudent, validateDemoCourseStudent } = require("../models/DemoCourseStudent.Model")

exports.createDemoCourseStudent= async (req, res, next) => {

    const demoCourseStudent = new DemoCourseStudent({
        id_student: req.body.id_student,
        id_demo_course: req.body.id_demo_course,
    })
    await demoCourseStudent.save()
    res.send(demoCourseStudent)
}

exports.getAllDemoCourseStudents= async (req, res, next) => {
    const demoCourseStudents = await DemoCourseStudent.find()
        .populate('id_student', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        .populate('id_demo_course', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        // .populate('id_course', {
        //     createdAt: 0,
        //     updatedAt: 0,
        //     __v: 0
        // })
    if (!demoCourseStudents) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudents)

}

exports.getDemoCourseStudentById= async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.findById(req.params.id)
        .populate('id_student', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        .populate('id_demo_course', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        // .populate('id_course', {
        //     createdAt: 0,
        //     updatedAt: 0,
        //     __v: 0
        // })
    if (!demoCourseStudent) res.status(404).send("The demo course student doesn't exist")
    else res.send(demoCourseStudent)
}
exports.getDemoCourseStudentByStudentId= async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.find({id_student:req.params.id})
    .populate('id_student', {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    .populate('id_demo_course', {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    // .populate('id_course', {
    //     createdAt: 0,
    //     updatedAt: 0,
    //     __v: 0
    // })
    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudent)
}

exports.getDemoCourseStudentByDemoCourseId= async (req, res, next) => {
    // const demoCourseStudent = await Course.find({id_course:req.params.id})
    const demoCourseStudent = await DemoCourse.find({id_demo_course:req.params.id})
    // .populate('id_student', {
    //     createdAt: 0,
    //     updatedAt: 0,
    //     __v: 0
    // })
    // .populate('id_course', {
    //     createdAt: 0,
    //     updatedAt: 0,
    //     __v: 0
    // })
    if (!demoCourseStudent) res.status(404).send("The demo  course student student doesn't exist")
    else res.send(demoCourseStudent)
}

exports.updateDemoCourseStudent= async (req, res, next) => {
    const { error } = validateDemoCourseStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const demoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id, {
        id_student: req.body.id_student,
        id_demo_course: req.body.id_demo_course,
    })
    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudent)
}

exports.deleteDemoCourseStudent= async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.findByIdAndDelete(req.params.id)
    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else {
        const newDemoCourseStudent = await DemoCourseStudent.find({id_student:demoCourseStudent.id_student})

        res.send(newDemoCourseStudent)
    
    }
}


