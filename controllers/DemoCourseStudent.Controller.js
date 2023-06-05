const { Course } = require("../models/Course.Model")
const { DemoCourseStudent, validateDemoCourseStudent } = require("../models/DemoCourseStudent.Model")


// exports.createDemoCourseStudent = async (req, res, next) => {
//     const { error } = validateDemoCourseStudent(req.body)
//     if (error) return res.status(400).send(error.details[0].message)
//     const id_course = await Course.findById(req.body.id_course)
//     if (!id_course) return res.status(404).send("The course doesn't exist")
//     const id_student = await Student.findById(req.body.id_student)
//     if (!id_student) return res.status(404).send("The student doesn't exist")
//     const demoCourseStudent = new DemoCourseStudent({
//         id_student: req.body.id_student,
//         id_course: req.body.id_course,
//         start_date: req.body.start_date,
//         end_date: req.body.end_date,
//         isDeleted: req.body.isDeleted
//     })
//     await demoCourseStudent.save()
//     res.send(demoCourseStudent)
// }

// exports.getAllDemoCourseStudents = async (req, res, next) => {
//     const demoCourseStudents = await DemoCourseStudent.find()
//         .populate('id_student', {
//             createdAt: 0,
//             updatedAt: 0,
//             __v: 0
//         })
//         .populate('id_course', {
//             createdAt: 0,
//             updatedAt: 0,
//             __v: 0
//         })
//     if (!demoCourseStudents) res.status(404).send("The course student doesn't exist")
//     else res.send(demoCourseStudents)

// }

// exports.getDemoCourseStudentById = async (req, res, next) => {
//     const demoCourseStudent = await DemoCourseStudent.findById(req.params.id)
//         .populate('id_student', {
//             createdAt: 0,
//             updatedAt: 0,
//             __v: 0
//         })
//         .populate('id_course', {
//             createdAt: 0,
//             updatedAt: 0,
//             __v: 0
//         })
//     if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
//     else res.send(demoCourseStudent)
// }

// exports.updateDemoCourseStudent = async (req, res, next) => {
//     const { error } = validateDemoCourseStudent(req.body)
//     if (error) return res.status(400).send(error.details[0].message)
//     const demoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id, {
//         id_student: req.body.id_student,
//         id_course: req.body.id_course,
//         start_date: req.body.start_date,
//         end_date: req.body.end_date,
//         isDeleted: req.body.isDeleted
//     })
//     if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
//     else res.send(demoCourseStudent)
// }

// exports.deleteDemoCourseStudent = async (req, res, next) => {
//     const demoCourseStudent = await DemoCourseStudent.findByIdAndDelete(req.params.id)
//     if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
//     else res.send(demoCourseStudent)
// }


const demoCourseController={
    createDemoCourseStudent: async (req, res, next) => {
        const { error } = validateDemoCourseStudent(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const id_course = await Course.findById(req.body.id_course)
        if (!id_course) return res.status(404).send("The course doesn't exist")
        const id_student = await Student.findById(req.body.id_student)
        if (!id_student) return res.status(404).send("The student doesn't exist")
        const demoCourseStudent = new DemoCourseStudent({
            id_student: req.body.id_student,
            id_course: req.body.id_course,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            isDeleted: req.body.isDeleted
        })
        await demoCourseStudent.save()
        res.send(demoCourseStudent)
    },


    getAllDemoCourseStudents : async (req, res, next) => {
        const demoCourseStudents = await DemoCourseStudent.find()
            .populate('id_student', {
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            })
            .populate('id_course', {
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            })
        if (!demoCourseStudents) res.status(404).send("The course student doesn't exist")
        else res.send(demoCourseStudents)
    
    },

    getDemoCourseStudentById : async (req, res, next) => {
        const demoCourseStudent = await DemoCourseStudent.findById(req.params.id)
            .populate('id_student', {
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            })
            .populate('id_course', {
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            })
        if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
        else res.send(demoCourseStudent)
    },

    updateDemoCourseStudent : async (req, res, next) => {
        const { error } = validateDemoCourseStudent(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const demoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id, {
            id_student: req.body.id_student,
            id_course: req.body.id_course,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            isDeleted: req.body.isDeleted
        })
        if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
        else res.send(demoCourseStudent)
    },

    deleteDemoCourseStudent : async (req, res, next) => {
        const demoCourseStudent = await DemoCourseStudent.findByIdAndDelete(req.params.id)
        if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
        else res.send(demoCourseStudent)
    },

    // studentCannotAccess:async (req, res, next) => {
    //     const currentDate= new Date().getTime()
    //     if( currentDate>req.body.end_date){
    //         res.send("Time access is ended")
    //     }
    //     else this.getDemoCourseStudentById(req, res, next)
    // },

    checkFullAccess:async (req, res, next) => {
        const demCourseStudent = await DemoCourseStudent.findById({id_course:req.params.id},{
            createdAt:0,
            updatedAt:0,
            __v:0
        })
        const number_of_student= await Course.findById(req.params.id,{
            createdAt:0,
            updatedAt:0,
            __v:0
        })
        console.log({number_of_student, demCourseStudent})
        if(demCourseStudent.length < number_of_student.number_of_student){
            this.createDemoCourseStudent(req, res, next)

        }
        else res.send("This course is full")
    }
}

module.exports= demoCourseController
