const demoCourseController = require("../controllers/DemoCourseStudent.Controller")
const { Course } = require("../models/Course.Model")
const { DemoCourse } = require("../models/DemoCourse.Model")
const { DemoCourseStudent, validateDemoCourseStudent } = require("../models/DemoCourseStudent.Model")
const { Student } = require("../models/Student.Model")

const checkDemoCourseStudent= {
    checkDuplicateCourse: async (req, res, next) => {
console.log("checkDuplicateCourse")
        try {
            const { error } = validateDemoCourseStudent(req.body)
            if (error) return res.status(400).send(error.details[0].message)
            // const id_course = await Course.findById(req.body.id_course)
            // if (!id_course) return res.status(404).send("The course doesn't exist")
            const id_demo_course= await DemoCourseStudent.findById(req.body.id_demo_course)
            if (id_demo_course) return res.status(400).send("Bạn đã đăng kí khóa học này rồi!")
            const id_student = await Student.findById(req.body.id_student)
            if (!id_student) return res.status(404).send("The student doesn't exist")
            const demoCourseStudent = await DemoCourseStudent.findOne(
                {
                    id_student: req.body.id_student,
                    // id_course: req.body.id_course
                    id_demo_course: req.body.id_demo_course
                }).exec()
                console.log({demoCourseStudent})
            if (demoCourseStudent) {
                res.status(400).send("Bạn đã đăng kí khóa học này rồi!")
                console.log(demoCourseStudent)
            }
          else next()
        } catch (error) {
            console.log(error)
        }

    },
    checkFullAccess: async (req, res, next) => {
        console.log("checkFullAccess")
        const demoCourseStudent = await DemoCourseStudent.find({
            // id_course:req.body.id_course
            id_demo_course: req.body.id_demo_course
        }, {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        console.log("demoCourseStudent",demoCourseStudent)
        const democourse = await DemoCourse.findById(req.body.id_demo_course)
        console.log("democourse",democourse)
        const number_of_student = await Course.findById(democourse.id_course, {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        console.log("number_of_student",number_of_student)
        console.log( "number_of_student",number_of_student.number_of_student,"number of demo course student ", demoCourseStudent.length )
        if (demoCourseStudent==null || demoCourseStudent.length < number_of_student.number_of_student) {
            next()

        }
        else return res.status(400).send("Lớp học đã đầy. Vui lòng chọn lớp học khác")
    },

}

module.exports = checkDemoCourseStudent