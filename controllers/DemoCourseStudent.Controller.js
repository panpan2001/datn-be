const { Course } = require("../models/Course.Model")
const { CourseCategory } = require("../models/CourseCategory.Model")
const { DemoCourse } = require("../models/DemoCourse.Model")
const { DemoCourseStudent, validateDemoCourseStudent } = require("../models/DemoCourseStudent.Model")
const { Teacher } = require("../models/Teacher.Model")
const { Account } = require("../models/Account.Model")
exports.createDemoCourseStudent = async (req, res, next) => {

    const demoCourseStudent = new DemoCourseStudent({
        id_student: req.body.id_student,
        id_demo_course: req.body.id_demo_course,
        isJudged: req.body.isJudged,
        isReported: req.body.isReported,
        reportedMessage: req.body.reportedMessage,
        reportedDateTime: req.body.reportedDateTime
    })
    await demoCourseStudent.save()
    res.send(demoCourseStudent)
}

exports.getAllDemoCourseStudents = async (req, res, next) => {
    const demoCourseStudents = await DemoCourseStudent.find()
        .populate('id_student', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        .populate(
            [
                {
            path: 'id_demo_course',
            populate: {
                path: 'id_course',
                model: Course,
                select: "id_course name  ",
                populate: 
                [
                    {
                    path: 'category_id',
                    model: CourseCategory,
                    select: "_id category_name type level "
                },
                 {
                    path: 'id_teacher',
                    model: Teacher,
                    // select: "id_teacher  ",
                    populate: {
                        path: 'account_id',
                        model: Account,
                    }
                }]
            }
        }
    ]
    )


    if (!demoCourseStudents) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudents)

}

exports.getDemoCourseStudentById = async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.findById(req.params.id)
        .populate('id_student', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        .populate(
            [
                {
            path: 'id_demo_course',
            populate: {
                path: 'id_course',
                model: Course,
                select: "id_course name  ",
                populate: 
                [
                    {
                    path: 'category_id',
                    model: CourseCategory,
                    select: "_id category_name type level "
                },
                 {
                    path: 'id_teacher',
                    model: Teacher,
                    // select: "id_teacher  ",
                    populate: {
                        path: 'account_id',
                        model: Account,
                    }
                }]
            }
        }
    ]
    )


    if (!demoCourseStudent) res.status(404).send("The demo course student doesn't exist")
    else res.send(demoCourseStudent)
}
exports.getDemoCourseStudentByStudentId = async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.find({ id_student: req.params.id })
        .populate('id_student', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        .populate(
            [
                {
            path: 'id_demo_course',
            populate: {
                path: 'id_course',
                model: Course,
                select: "id_course name  ",
                populate: 
                [
                    {
                    path: 'category_id',
                    model: CourseCategory,
                    select: "_id category_name type level "
                },
                 {
                    path: 'id_teacher',
                    model: Teacher,
                    // select: "id_teacher  ",
                    populate: {
                        path: 'account_id',
                        model: Account,
                    }
                }]
            }
        }
    ]
    )

    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudent)
}

exports.getDemoCourseStudentByDemoCourseId = async (req, res, next) => {
    // const demoCourseStudent = await Course.find({id_course:req.params.id})
    const demoCourseStudent = await DemoCourseStudent.find({ id_demo_course: req.params.id })
        .populate('id_student', {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        .populate(
            [
                {
            path: 'id_demo_course',
            populate: {
                path: 'id_course',
                model: Course,
                select: "id_course name  ",
                populate: 
                [
                    {
                    path: 'category_id',
                    model: CourseCategory,
                    select: "_id category_name type level "
                },
                 {
                    path: 'id_teacher',
                    model: Teacher,
                    // select: "id_teacher  ",
                    populate: {
                        path: 'account_id',
                        model: Account,
                    }
                }]
            }
        }
    ]
    )

    if (!demoCourseStudent) res.status(404).send("The demo  course student student doesn't exist")
    else res.send(demoCourseStudent)
}

exports.updateDemoCourseStudent = async (req, res, next) => {
    const { error } = validateDemoCourseStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const demoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id, {
        id_student: req.body.id_student,
        id_demo_course: req.body.id_demo_course,
        isJudged: req.body.isJudged,
        isReported: req.body.isReported,
        reportedMessage: req.body.reportedMessage,
        reportedDateTime: req.body.reportedDateTime

    })
    .populate('id_student', {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    .populate(
        [
            {
        path: 'id_demo_course',
        populate: {
            path: 'id_course',
            model: Course,
            select: "id_course name  ",
            populate: 
            [
                {
                path: 'category_id',
                model: CourseCategory,
                select: "_id category_name type level "
            },
             {
                path: 'id_teacher',
                model: Teacher,
                // select: "id_teacher  ",
                populate: {
                    path: 'account_id',
                    model: Account,
                }
            }]
        }
    }
]
)

    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudent)
}

exports.reportDemoCourseStudent = async (req, res, next) => {
    console.log("reportDemoCourseStudent",req.body)
    const oldDemoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id,{
        $set: {
            reportedMessage:[]
        }
    })
    const demoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id, 
        {
            $set: {
                isReported: req.body.isReported,
                reportedDateTime: req.body.reportedDateTime,
                
            },
            $addToSet:
            {
                "reportedMessage":
                {
                    $each: req.body.reportedMessage
                }
            },
            $inc:{
                countReported:1
            }
       
        
    },{
        new: true
    })
    .populate('id_student', {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    .populate(
        [
            {
        path: 'id_demo_course',
        populate: {
            path: 'id_course',
            model: Course,
            select: "id_course name  ",
            populate: 
            [
                {
                path: 'category_id',
                model: CourseCategory,
                select: "_id category_name type level "
            },
             {
                path: 'id_teacher',
                model: Teacher,
                // select: "id_teacher  ",
                populate: {
                    path: 'account_id',
                    model: Account,
                }
            }]
        }
    }
]
)

    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else {
        console.log("reportDemoCourseStudent",demoCourseStudent)
        const newDemoCourseStudent= await DemoCourseStudent
        .find({ id_student: demoCourseStudent.id_student })
        .populate(
            [
                {
            path: 'id_demo_course',
            populate: {
                path: 'id_course',
                model: Course,
                select: "id_course name  ",
                populate: 
                [
                    {
                    path: 'category_id',
                    model: CourseCategory,
                    select: "_id category_name type level "
                },
                 {
                    path: 'id_teacher',
                    model: Teacher,
                    // select: "id_teacher  ",
                    populate: {
                        path: 'account_id',
                        model: Account,
                    }
                }]
            }
        }
    ]
    )

        res.send(newDemoCourseStudent)
}}


exports.updateDemoCourseJudge = async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.findByIdAndUpdate(req.params.id, {
        isJudged: req.body.isJudged
    })
    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else res.send(demoCourseStudent)
}
exports.deleteDemoCourseStudent = async (req, res, next) => {
    const demoCourseStudent = await DemoCourseStudent.findByIdAndDelete(req.params.id)
    if (!demoCourseStudent) res.status(404).send("The course student doesn't exist")
    else {
        const newDemoCourseStudent = await DemoCourseStudent.
        find({ id_student: demoCourseStudent.id_student })
        .populate(
            [
                {
            path: 'id_demo_course',
            populate: {
                path: 'id_course',
                model: Course,
                select: "id_course name  ",
                populate: 
                [
                    {
                    path: 'category_id',
                    model: CourseCategory,
                    select: "_id category_name type level "
                },
                 {
                    path: 'id_teacher',
                    model: Teacher,
                    // select: "id_teacher  ",
                    populate: {
                        path: 'account_id',
                        model: Account,
                    }
                }]
            }
        }
    ]
    )

        res.send(newDemoCourseStudent)

    }
}


