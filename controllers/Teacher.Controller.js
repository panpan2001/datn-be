let { Teacher, validateTeacher } = require('../models/Teacher.Model')
const { Account } = require('../models/Account.Model');
const {StudentRating}=require('../models/StudentRating.Model')
const {ParentRating}= require('../models/ParentRating.Model')
const {Course}=require('../models/Course.Model')
const {TeacherAcademic}=require('../models/TeacherAcademic.Model')
const {TeacherDegree}=require('../models/TeacherDegree.Model')

exports.createTeacher = async (req, res, next) => {
    const { error } = validateTeacher(req.body);
    if (error) {
        console.log("error");
        return res.status(400).send(error.details[0].message);
    }
    const account_id = await Account.findById(req.body.account_id);
    if (!account_id) res.status(400).send("Account doesn't exist")
  else { 
    const  teacher = new Teacher({
        account_id: account_id,
        personal_description: req.body.personal_description,
        personal_image: req.body.personal_image,
        id_student_rate: req.body.id_student_rate,
        id_parent_rate: req.body.id_parent_rate,
        id_course: req.body.id_course,
        id_academic: req.body.id_academic,
        id_degree: req.body.id_degree
    })
     await teacher.save();
    res.status(200).json(teacher);
}
}

exports.getAllTeachers = async (req, res, next) => {
 
        const teachers = await Teacher.find();
        if(!teachers) res.status(404).send("The teacher doesn't exist")
        else res.status(200).json(teachers);
   
}

exports.getTeacherById = async (req, res, next) => {

        const teacher = await Teacher.findById(req.params.id);
        if(!teacher) res.status(404).send("The teacher doesn't exist")
        else res.send(teacher);
  
}

exports.updateTeacher = async (req, res, next) => {
    const { error } = validateTeacher(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, {
        personal_description: req.body.personal_description,
        personal_image: req.body.personal_image,
        id_student_rate: req.body.id_student_rate,
        id_parent_rate: req.body.id_parent_rate,
        id_course: req.body.id_course,
        id_academic: req.body.id_academic,
        id_degree: req.body.id_degree
    }, 
    { new: true });
    if(!teacher) return res.status(404).send("Teacher not found")
    else req.send("Teacher's updated").json(teacher);
}

exports.deleteTeacher = async (req, res, next) => {
   
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if(!teacher) res.status(404).send("Teacher not found")
        else res.status(200).send("Teacher's deleted").json(teacher);
   
}