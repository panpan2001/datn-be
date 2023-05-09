const { Account } = require("../models/Account.Model")
const { validateStudent, Student } = require("../models/Student.Model")


exports.creaateStudent=async(req,res,next)=>{
     const {error}= validateStudent(req.body)
     if(error) return res.status(400).send(error.details[0].message)
     const account_id= await Account.findById(req.body.account_id)
     if(!account_id) return res.status(400).send("Account doesn't exist")
     else {
        const student=new Student({
            account_id:req.body.account_id,
         name:req.body.name,
         parent_name:req.body.parent_name,
         parent_phone_number:req.body.parent_phone_number,
         id_rating_teacher:req.body.id_rating_teacher
         
     })
     await student.save()
     res.send(student)
    }
}

exports.getAllStudents=async(req,res,next)=>{
    const students=await Student.find()
    if(!students) res.status(404).send("The student doesn't exist")
    else res.send(students)
}

 exports.getStudentById=async(req,res,next)=>{
     const student=await Student.findById(req.params.id)
     if(!student) res.status(404).send("The student doesn't exist")
     else res.send(student)
 }

 exports.updateStudent=async(req,res,next)=>{
     const {error}= validateStudent(req.body)
     if(error) return res.status(400).send(error.details[0].message)
     const student=await Student.findByIdAndUpdate(req.params.id,{
         name:req.body.name,
         parent_name:req.body.parent_name,
         parent_phone_number:req.body.parent_phone_number,
         id_rating_teacher:req.body.id_rating_teacher
     },
     {new:true})
     if(!student) res.status(404).send("The student doesn't exist")
     else res.send(student)

 }

 exports.deleteStudent=async(req,res,next)=>{
     const student=await Student.findByIdAndDelete(req.params.id)
     if(!student) res.status(404).send("The student doesn't exist")
     else res.send(student)
 }

 