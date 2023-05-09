
const {TeacherDegree,validateTeacherDegree} = require('../models/TeacherDegree.Model')

exports.createTeacherDegree=async(req,res,next)=>{
  
    const {error}=validateTeacherDegree(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const teacherDegree=new TeacherDegree({
        degree_name:req.body.degree_name,
        degree_period:req.body.degree_period,
        degree_level:req.body.degree_level,
        degree_evidence:req.body.degree_evidence,
        degree_description:req.body.degree_description,
        degree_status:req.body.degree_status
    });
    await teacherDegree.save();
    res.send(teacherDegree);

}

exports.getTeacherDegree=async(req,res,next)=>{
   
        const teacherDegrees = await TeacherDegree.find();
        if(!teacherDegrees) res.status(404).send("The teacher degree doesn't exist")
        else res.send(teacherDegrees);
   
}

exports.getTeacherDegreeById=async(req,res,next)=>{
    const teacherDegree = await TeacherDegree.findById(req.params.id);
    if(!teacherDegree) res.status(404).send("The teacher degree doesn't exist")
    else res.send(teacherDegree);
}

exports.updateTeacherDegree=async(req,res,next)=>{
    const {error}=validateTeacherDegree(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const teacherDegree = await TeacherDegree.findByIdAndUpdate(req.params.id,{
        degree_name:req.body.degree_name,
        degree_period:req.body.degree_period,
        degree_level:req.body.degree_level,
        degree_evidence:req.body.degree_evidence,
        degree_description:req.body.degree_description,
        degree_status:req.body.degree_status
    },{new:true});
    if(!teacherDegree) res.status(404).send("The teacher degree doesn't exist")
    else res.send(teacherDegree);
}

exports.deleteTeacherDegree=async(req,res,next)=>{
    const teacherDegree = await TeacherDegree.findByIdAndDelete(req.params.id);
    if(!teacherDegree) res.status(404).send("The teacher degree doesn't exist")
    else res.send(teacherDegree);
    
}