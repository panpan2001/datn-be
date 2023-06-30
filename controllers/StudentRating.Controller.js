const { Account } = require('../models/Account.Model')
const { Course } = require('../models/Course.Model')
const { CourseCategory } = require('../models/CourseCategory.Model')
const { CourseStudent } = require('../models/CourseStudent.Model')
const { DemoCourse } = require('../models/DemoCourse.Model')
const { DemoCourseStudent } = require('../models/DemoCourseStudent.Model')
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
        id_teacher: req.body.id_teacher,
        id_student: req.body.id_student,
        rating_avg_teacher: req.body.rating_avg_teacher,
        rating_content_1: req.body.rating_content_1,
        rating_content_2: req.body.rating_content_2,
        rating_content_3: req.body.rating_content_3,
        rating_content_4: req.body.rating_content_4,
        comment: req.body.comment,
        id_course: req.body.id_course,
        isDemo: req.body.isDemo,
        isBadJudge: req.body.isBadJudge,
        countBadJudge: req.body.countBadJudge,
        messageFromSystem: req.body.messageFromSystem
    })
    // const newTeacherRating= await Teacher.findByIdAndUpdate(req.body.id_teacher,{
    //     $push:{
    //         studentRating:studentRating._id
    //     }
    // })
    if (req.body.isDemo == true) {
        let demoStudentRating = await DemoCourseStudent
            .find({
                id_student: req.body.id_student,
                isJudged: false
            },
            ).populate([{
                path: "id_demo_course",
                model: DemoCourse,
                populate: [
                    {
                        path: "id_course",
                        model: Course
                    }
                ]
            }])
        demoStudentRating = demoStudentRating.filter(i => i.id_demo_course.id_course._id == req.body.id_course)[0]
        console.log({ demoStudentRating })
        demoStudentRating = await demoStudentRating.updateOne({ isJudged: true },)

        console.log({ demoStudentRating })
        if (!demoStudentRating) res.status(404).send("The demo student rating can not  update isJudged ")
    }
    else {
        const studentRating = await CourseStudent.findOneAndUpdate({
            id_course: req.body.id_course,
            id_student: req.body.id_student
        }, {
            isJudged: true
        })
        console.log({ studentRating })
        if (!studentRating) res.status(404).send("The student rating can not  update isJudged ")
    }
    await studentRating.save()
    res.send(studentRating)
    // }
}

exports.getAllStudentRatings = async (req, res, next) => {
    const studentRatings = await StudentRating.find()
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
    if (!studentRatings) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRatings)
}

exports.getStudentRatingById = async (req, res, next) => {
    const studentRating = await StudentRating.findById(req.params.id)
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}
exports.getStudentRatingByStudentId = async (req, res, next) => {
    const studentRating = await StudentRating.find({ id_student: req.params.id })
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}

exports.getStudentRatingByTeacherId = async (req, res, next) => {
    const studentRating = await StudentRating.find({ id_teacher: req.params.id }, {

    })
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)
}

exports.updateStudentRating = async (req, res, next) => {

    const { error } = validateStudentRating(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const studentRating = await StudentRating.findByIdAndUpdate(req.params.id, {
        id_teacher: req.body.id_teacher,
        id_student: req.body.id_student,
        rating_avg_teacher: req.body.rating_avg_teacher,
        rating_content_1: req.body.rating_content_1,
        rating_content_2: req.body.rating_content_2,
        rating_content_3: req.body.rating_content_3,
        rating_content_4: req.body.rating_content_4,
        comment: req.body.comment,
        id_course: req.body.id_course,
        isDemo: req.body.isDemo,
        isBadJudge: req.body.isBadJudge,
        countBadJudge: req.body.countBadJudge,
        messageFromSystem: req.body.messageFromSystem,
        studentUpdatedAt: req.body.studentUpdatedAt
    },
        { new: true })
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    
    else {
        console.log("updateStudentRating",studentRating)
        res.send(studentRating)
    }

}

exports.updateStudentRatingPatch = async (req, res, next) => {

    const studentRating = await StudentRating.findByIdAndUpdate(req.params.id, {

        id_course: req.body.id_course
    },
        { new: true })
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else res.send(studentRating)

}

exports.updateQualityOfStudentRating = async (req, res, next) => {
    //req.body.status: "bad judge":1  or "good judge":0
    // console.log("req.body", req.body)
    const findStudentRating = await StudentRating.findByIdAndUpdate(req.params.id,
        {
            $set:{
                messageFromSystem: []
            }
        })
    if (req.body.status == 1) {
        
        const studentRating = await StudentRating.findByIdAndUpdate( req.params.id ,
            {
                $set: {
                    isBadJudge: true,
                    
                },
                $inc: { countBadJudge: 1 },
                $addToSet:
                {
                    "messageFromSystem":
                    {
                        $each: req.body.messageFromSystem
                    }
                }
            },{ new: true }

        )
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
        if (!studentRating) res.status(404).send("Can't update student rating to bad judge")
        else {
            const countBadJudge = studentRating.countBadJudge
            if (countBadJudge < 2)
             {
                // account isblocked tio true and send auto  message: "bad judge 2 time "" 
              let number_of_bad_judge= await StudentRating.find({id_student:studentRating.id_student})
              number_of_bad_judge= number_of_bad_judge.filter(item=>item.isBadJudge==true)
              if(number_of_bad_judge.length>=3){
                const student= await Student.findById(studentRating.id_student)
                const account = await Account.findByIdAndUpdate(student.account_id._id,
                    {
                        $set:{
                            is_deleted: true,
                            messageFromSystem: ["do có từ 3 đánh giá bị  báo xấu trở lên"]
                        }
                     
                },{ new: true })
              }
              else {
                console.log("bad judge 1 time", studentRating)
                res.send(studentRating)
              }
                
            }
            else {
                console.log("bad judge 2 time or more :", studentRating.countBadJudge)
                const student= await Student.findById(studentRating.id_student)
                const account = await Account.findByIdAndUpdate(student.account_id._id,
                    {
                        $set:{
                            is_deleted: true,
                            messageFromSystem: [" do có đánh giá bị báo xấu 2 lần trở lên"]
                        }
                     
                },{ new: true }
                )
                console.log("account is-deleted ", account.is_deleted)
                res.send(studentRating)
            }
        }
    }
    if (req.body.status == 0) {
        // console.log("message",findStudentRating.messageFromSystem)
        const studentRating = await StudentRating.findByIdAndUpdate(req.params.id, {
            $set:{
                isBadJudge: false,
                countBadJudge: 0,
                messageFromSystem: []
            },
           
            // $pullAll:
            //     { "messageFromSystem": findStudentRating.messageFromSystem }

        }, { new: true }
        )
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
        const student= await Student.findById(studentRating.id_student)
        const account = await Account.findByIdAndUpdate(student.account_id._id,
            {
                $set:{
                    is_deleted: false,
                    messageFromSystem: []
                }
             
        },{ new: true }
        )
        if (!studentRating) res.status(404).send("Can't update student rating to bad judge")
        else res.send(studentRating)
    }

}


exports.changeAppearanceStudentRating = async (req, res, next) => {
    let studentRating = null
    if(req.body.flag){
        studentRating = await StudentRating.findByIdAndUpdate(req.params.id,{
            isBadJudge: !req.body.isBadJudge,
        })
        studentRating = await StudentRating.find()
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
    }
    else {
         studentRating = await StudentRating.findByIdAndUpdate(req.params.id,{
            isBadJudge: !req.body.isBadJudge,
        })
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            // select: "_id  ",
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            // select: "_id  ",
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
        
    }
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
        else res.send(studentRating)
}

exports.deleteStudentRating = async (req, res, next) => {

    const studentRating = await StudentRating.findByIdAndDelete(req.params.id)
    
    if (!studentRating) res.status(404).send("The student rating doesn't exist")
    else {
        if(studentRating.isDemo==true){
            await DemoCourseStudent.findByIdAndUpdate(studentRating.id_course, {
                isJudged: false
            }
            )
        }
        else {
            await CourseStudent.findByIdAndUpdate(studentRating.id_course, {
                isJudged: false
            })
        }
        const newStudentRating = await StudentRating.find()
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_student',
            model: Student,
            populate: {
                path: 'account_id',
                model: Account
            }
        }, {
            path: 'id_course',
            model: Course,
            populate: {
                path: 'category_id',
                model: CourseCategory
            }
        }])
        res.send(newStudentRating)}
}

// auto imcrement value : https://stackoverflow.com/questions/28357965/mongoose-auto-increment 