const { Account } = require("../models/Account.Model")
const { validateStudent, Student } = require("../models/Student.Model")


exports.createStudent = async (req, res, next) => {
    const { error } = validateStudent(req.body)
    if (error) {
        console.log("req.body: ", req.body)
        return res.status(400).send(error.details[0].message)
    }
    console.log("req.body: ", req.body)
    const account_student = await Account.findById(req.body.account_id)
    // const account_id = await Account.findById(req.body.id)
    console.log("account create student: ", account_student)
    if (!account_student) return res.status(400).send("Account doesn't exist")
    else {
        const student = new Student({
            account_id: account_student._id,
            parent_name: req.body.parent_name,
            parent_phone_number: req.body.parent_phone_number,
            id_rating_teacher: req.body.id_rating_teacher

        })
        console.log("student created:  ", student)
        await student.save()
        res.send(student)
    }
}

exports.getAllStudents = async (req, res, next) => {

    const students = await Student.find().populate('account_id')
    if (!students) res.status(404).send("The student doesn't exist")
    else res.send(students)
}

exports.getStudentById = async (req, res, next) => {


    const student = await Student.findById(req.params.id).populate('account_id')
    console.log("student: ", req.body.id)
    console.log("student: ", student)

    if (!student) res.status(404).send("The student doesn't exist")
    else res.send(student)
}


exports.updateStudent = async (req, res, next) => {
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const student = await Student.findByIdAndUpdate(req.params.id, {
        parent_name: req.body.parent_name,
        parent_phone_number: req.body.parent_phone_number,
        id_rating_teacher: req.body.id_rating_teacher
    },
        { new: true })
    if (!student) res.status(404).send("The student doesn't exist")
    else res.send(student)

}

exports.deleteStudent = async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) res.status(404).send("The student doesn't exist")
    else res.send(student)
}


exports.getStudentByAccountId = async (req, res, next) => {
    console.log(req.params)
    const account_id = await Account.findById(req.params.id)
    console.log("account id: ", account_id)
    let student = await Student.findOne({ account_id: account_id },{
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    .populate('account_id',{
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    })
    // student= await Account.aggregate([
    //     {
    //         $lookup:{
    //             from:"Student",
    //             localField:"_id",
    //             foreignField:"account_id",
    //             as:"student"
    //         }
    //     }
    // ])
    console.log("student get by account id : ", student)

    if (!student) res.status(404).send("The student doesn't exist")
    else res.send(student)
}

