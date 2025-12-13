const { Account } = require("../models/Account.Model")
const { Course } = require("../models/Course.Model")
const { CourseCategory } = require("../models/CourseCategory.Model")
const { DemoCourse, validateDemoCourse } = require("../models/DemoCourse.Model")
const { DemoCourseStudent } = require("../models/DemoCourseStudent.Model")
const { Student } = require("../models/Student.Model")
const { Teacher } = require("../models/Teacher.Model")
const moment = require('moment')

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
        link_meeting: req.body.link_meeting,
        isHidden: req.body.isHidden
    })
    if (!demoCourse) res.status(404).send("Can't create course")
    await demoCourse.save()
    res.send(demoCourse)
}

exports.getAllDemoCourse = async (req, res, next) => {
    const courses = await DemoCourse.find().populate([{
        path: 'id_course',
        // select: "id_course name category_id id_teacher ",
        populate: [{
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
                model: Account
            }
        }
        ]
    }])
    if (!courses) res.status(404).send("The course doesn't exist")
    else res.send(courses)
}

exports.getDemoCourseById = async (req, res, next) => {
    const course = await DemoCourse.findById(req.params.id).populate([{
        path: 'id_course',
        populate: [{
            path: 'category_id',
            model: CourseCategory,
            select: "_id category_name type level "
        },
        {
            path: 'id_teacher',
            model: Teacher,
            populate: {
                path: 'account_id',
                model: Account
            }
        }
        ]
    }])
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}

exports.getDemoCourseByCourseId = async (req, res, next) => {

    const demoCourse = await DemoCourse.find({ id_course: req.params.id }).populate([{
        path: 'id_course',
        // select: "id_course name category_id id_teacher ",
        populate: [{
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
                model: Account
            }
        }
        ]
    }])
    // console.log("demoCourse",{demoCourse})
    if (!demoCourse) res.status(404).send("The demo course doesn't exist")
    else res.send(demoCourse)
}

exports.getDemoCourseByTeacherId = async (req, res, next) => {
    let course = await Course.find({ id_teacher: req.params.id })
    course = course.map(item => item._id)

    if (!course) res.status(404).send("The course doesn't exist")

    const demoCourse = await DemoCourse
        .find({ id_course: { $in: course } })
        .populate([{
            path: 'id_course',
            // select: "id_course name category_id id_teacher ",
            populate: [{
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
                    model: Account
                }
            }
            ]
        }])

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
        link_meeting: req.body.link_meeting,
        isHidden: req.body.isHidden
    }, { new: true })
        .populate([{
            path: 'id_course',
            // select: "id_course name category_id id_teacher ",
            populate: [{
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
                    model: Account
                }
            }
            ]
        }])
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course)
}

exports.changeAppearanceDemoCourse = async (req, res, next) => {
    console.log("req.body", req.body)
    const course = await DemoCourse
        .findByIdAndUpdate(req.params.id, {
            isHidden: !req.body.isHidden
        }, { new: true })
        .populate([{
            path: 'id_course',
            // select: "id_course name category_id id_teacher ",
            populate: [{
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
                    model: Account
                }
            }
            ]
        }])
    if (!course) res.status(404).send("The course doesn't exist")
    else {
        console.log({ course })
        const newcourse = await DemoCourse.find()
            .populate([{
                path: 'id_course',
                // select: "id_course name category_id id_teacher ",
                populate: [{
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
                        model: Account
                    }
                }
                ]
            }])
        res.send(newcourse)
    }
}


exports.addLinkVideo = async (req, res, next) => {
    // console.log("id  democourse add", req.params.id)
    console.log("req.body", req.body)
    if (req.body.type === "Video") {
        const course = await DemoCourse.findByIdAndUpdate(req.params.id, {
            $pullAll: {
                link_video: req.body.del_link_video

            }
        })

        const newcourse = await DemoCourse.findByIdAndUpdate(req.params.id, {
            $addToSet:
            {
                link_video:
                {
                    $each: req.body.link_video,
                }
            }
        }
        )
            .populate([{
                path: 'id_course',
                // select: "id_course name category_id id_teacher ",
                populate: [{
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
                        model: Account
                    }
                }
                ]
            }])
        // console.log("course link video demo course ", newcourse.link_video)

        if (!newcourse) res.status(404).send("The course doesn't exist")
        else {
            res.send(newcourse)
            console.log("course link video demo course ", newcourse.link_video)
            let demoCourseStudent = await DemoCourseStudent.find({ id_demo_course: req.params.id })
            demoCourseStudent = demoCourseStudent.map(item => item.id_student)
            console.log("demoCourseStudent id ", demoCourseStudent)
            for (let i = 0; i < demoCourseStudent.length; i++) {
                const student_id = await Student.findById(demoCourseStudent[i])
                console.log("student_id", i, student_id)
                const account = await Account.findByIdAndUpdate(student_id.account_id, {
                    $addToSet:
                    {
                        messageFromSystem: [` ( ${moment(newcourse.updatedAt).format('DD/MM/YYYY HH:mm:ss')}) Khóa học thử ${newcourse.id_course.name}, bắt đầu ngày ${moment(newcourse.start_date).format('DD/MM/YYYY')} được cập nhật link video thành: ${req.body.link_video.map(i => `${i}, `)} `]
                    }

                })
                console.log(account.messageFromSystem)
            }
        }
    }
    else {
        const course = await DemoCourse.findByIdAndUpdate(req.params.id, {
            $pullAll: {
                link_meeting: req.body.del_link_video
            }
        })
        const newcourse = await DemoCourse.findByIdAndUpdate(req.params.id, {
            $addToSet:
            {
                link_meeting:
                {
                    $each: req.body.link_video,
                }
            }
        }
        )
            .populate([{
                path: 'id_course',
                // select: "id_course name category_id id_teacher ",
                populate: [{
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
                        model: Account
                    }
                }
                ]
            }])

        if (!newcourse) res.status(404).send("The course doesn't exist")
        else {
            res.send(newcourse)
        console.log("course link meeting demo course ", newcourse.link_meeting)
        let demoCourseStudent = await DemoCourseStudent.find({ id_demo_course: req.params.id })
            demoCourseStudent = demoCourseStudent.map(item => item.id_student)
            console.log("demoCourseStudent id ", demoCourseStudent)
            for (let i = 0; i < demoCourseStudent.length; i++) {
                const student_id = await Student.findById(demoCourseStudent[i])
                console.log("student_id", i, student_id)
                const account = await Account.findByIdAndUpdate(student_id.account_id, {
                    $addToSet:
                    {
                        messageFromSystem: [` ( ${moment(newcourse.updatedAt).format('DD/MM/YYYY HH:mm:ss')}) Khóa học thử ${newcourse.id_course.name}, bắt đầu ngày ${moment(newcourse.start_date).format('DD/MM/YYYY')} được cập nhật link meeting thành: ${req.body.link_video.map(i => `${i}, `)} `]
                    }

                })
                console.log(account.messageFromSystem)
            }
    }
    }
}


exports.sendReportDemoCourseMessage = async (req, res, next) => {
    const resetMessage = await DemoCourse.findByIdAndUpdate(req.params.id, {
        $set: {
            reportedMessage: []
        }
    });
    const adminReportMessage = await DemoCourse.findByIdAndUpdate(req.params.id, {
        $set: {
            reportedDateTime: req.body.reportedDateTime,

        },
        $inc: {
            countReportedTime: 1
        },
        $addToSet: {
            reportedMessage: {
                $each: req.body.reportedMessage
            }
        }
    })
        .populate([{
            path: 'id_course',
            // select: "id_course name category_id id_teacher ",
            populate: [{
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
                    model: Account
                }
            }
            ]
        }])
    if (!adminReportMessage) res.status(404).send("The course doesn't exist")
    else {
        const student_report = await DemoCourseStudent.find(
            {
                id_demo_course: adminReportMessage._id,
                isReported: true
            }
        )
        const number_of_report = student_report.length
        const course = await Course.findById(adminReportMessage.id_course)
        const number_student_of_course = course.number_of_student
        if ((number_of_report / number_student_of_course) >= 0.5) {
            await DemoCourse.findByIdAndUpdate(req.params.id, {
                isHidden: true
            })
            res.send(adminReportMessage)
        }
        else {
            if (adminReportMessage.countReportedTime >= 2) {
                console.log("reported >= 2")
                await DemoCourse.findByIdAndUpdate(req.params.id, {
                    isHidden: true
                })
                // console.log("sendReportDemoCourseMessage", adminReportMessage)
                res.send(adminReportMessage)
            }
            else {
                console.log("reported < 2")
                // console.log("sendReportDemoCourseMessage", adminReportMessage)
                res.send(adminReportMessage)
            }
        }

    }
}

exports.deleteDemoCourse = async (req, res, next) => {
    // teacher delete demo course 
    // console.log("id  democourse delete", req.params.id)
    const demoCourse = await DemoCourse.findByIdAndDelete(req.params.id)
        .populate([{
            path: 'id_course',
            // select: "id_course name category_id id_teacher ",
            populate: [{
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
                    model: Account
                }
            }
            ]
        }])
    // console.log({ demoCourse })
    // const demoCourseStudent = await DemoCourseStudent.findOne({ id_demo_course: req.params.id })
    // if (demoCourseStudent) {
    await DemoCourseStudent.deleteMany({ id_demo_course: req.params.id })
    // }
    if (!demoCourse) res.status(404).send("The course doesn't exist")
    else {
        // const newDemoCourse = await DemoCourse.find({ id_course: demoCourse.id_course })
        const teacher = await Teacher.findOne({ account_id: req.headers.account_id })
        console.log("teacher?", teacher ? teacher : false)
        let course = await Course.find({ id_teacher: teacher._id })
        course = course.map(item => item._id)
        console.log("couurse:", { course })
        const newDemoCourse = await DemoCourse.find({ id_course: { $in: course } })
            .populate([{
                path: 'id_course',
                // select: "id_course name category_id id_teacher ",
                populate: [{
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
                        model: Account
                    }
                }
                ]
            }])
        res.status(200).send(newDemoCourse)
        console.log("teacher delete demo course (deleteDemoCourse) : ", newDemoCourse.length)
    }
}
exports.adminDeleteDemoCourse = async (req, res, next) => {
    // console.log("id  democourse delete",req.params.id)
    const demoCourse = await DemoCourse.findByIdAndDelete(req.params.id)
    // const demoCourse = await DemoCourse.findById(req.params.id)
    console.log("demo course id ", demoCourse._id)
    // const demoCourseStudent = await DemoCourseStudent.findOne({ id_demo_course: req.params.id })
    // console.log({ demoCourseStudent })
    // if (demoCourseStudent) {

    const a = await DemoCourseStudent.deleteMany({ id_demo_course: req.params.id })
    console.log("a", a)
    // const test= await DemoCourseStudent.find({ id_demo_course: req.params.id })
    //    console.log("test",test,test.length)
    // }
    if (!demoCourse) res.status(404).send("The course doesn't exist")
    else {
        const newDemoCourse = await DemoCourse.find()
            .populate([{
                path: 'id_course',
                // select: "id_course name category_id id_teacher ",
                populate: [{
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
                        model: Account
                    }
                }
                ]
            }])
        res.status(200).send(newDemoCourse)
        console.log("newDemoCourse.length:", newDemoCourse.length)
    }
}

exports.deleteDemoCourseReport = async (req, res, next) => {
    // console.log("req.headers", req.headers)
    const demoCourse = await DemoCourse.findByIdAndUpdate(req.params.id,{
        $set:{
            reportedMessage:[]
        }
    })
    .populate([{
        path: 'id_course',
        // select: "id_course name category_id id_teacher ",
        populate: [{
            path: 'category_id',
            model: CourseCategory,
            select: "_id category_name type level "
        },
        {
            path: 'id_teacher',
            model: Teacher,
            populate: {
                path: 'account_id',
                model: Account
            }
        }
        ]
    }])
    if(!demoCourse) res.status(404).send("The course doesn't exist")
    else {
        let course = await Course.find({ id_teacher: req.body.id_teacher })
    course = course.map(item => item._id) 
        // console.log("demoCourse.reportedMessage",demoCourse.reportedMessage)
        const newDemoCourse = await DemoCourse.find({id_course:{ $in: course }})
        .populate([{
            path: 'id_course',
            // select: "id_course name category_id id_teacher ",
            populate: [{
                path: 'category_id',
                model: CourseCategory,
                select: "_id category_name type level "
            },
            {
                path: 'id_teacher',
                model: Teacher,
                populate: {
                    path: 'account_id',
                    model: Account
                }
            }
            ]
        }])
        res.send(newDemoCourse)
        console.log("newDemoCourse.length:", newDemoCourse.length)
                }
}
// https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array 