const { Account } = require("../models/Account.Model")
const { validateStudent, Student } = require("../models/Student.Model")


exports.createStudent=async(req,res,next)=>{
     const {error}= validateStudent(req.body)
    if(error) {
        console.log("req.body",req.body)
        return res.status(400).send(error.details[0].message)}
    
     const account_id= await Account.findById(req.body.account_id)
     console.log(account_id)
     if(!account_id) return res.status(400).send("Account doesn't exist")
     else {
        const student=new Student({
            account_id:req.body.account_id,
         parent_name:req.body.parent_name,
         parent_phone_number:req.body.parent_phone_number,
         id_rating_teacher:req.body.id_rating_teacher
         
     })
     console.log("student",student)
     await student.save()
     res.send(student)
    }
}

exports.getAllStudents=async(req,res,next)=>{
  
    const students= await Student.find().populate('account_id')
    if(!students) res.status(404).send("The student doesn't exist")
    else res.send(students)
}

 exports.getStudentById=async(req,res,next)=>{

  
    const student= await Student.findById(req.params.id).populate('account_id')
    console.log("student: ",req.body.id)
     console.log("student: ",student)

     if(!student) res.status(404).send("The student doesn't exist")
     else res.send(student)
 }

 exports.getStudentByAccountId=async(req,res,next)=>{
    console.log(req.params)
    const account_id= await Account.findById(req.params.id)
    console.log("account id: ",account_id)
    let  student= await Student.findOne({account_id:account_id}).populate('account_id')
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
    console.log("student: ",student)

    if(!student) res.status(404).send("The student doesn't exist")
    else res.send(student)
 }

 exports.updateStudent=async(req,res,next)=>{
     const {error}= validateStudent(req.body)
     if(error) return res.status(400).send(error.details[0].message)
     const student=await Student.findByIdAndUpdate(req.params.id,{
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

 