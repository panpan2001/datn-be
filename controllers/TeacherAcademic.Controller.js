const { TeacherAcademic,validateTeacherAcademic } = require("../models/TeacherAcademic.Model")


exports.createTeacherAcademic = async (req, res, next) => {

        const {error}= validateTeacherAcademic(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const teacherAcademic = new TeacherAcademic({
            university_name: req.body.university_name,
            academic_major: req.body.academic_major,
            academic_period: req.body.academic_period,
            academic_evidence: req.body.academic_evidence,
            academic_description: req.body.academic_description,
            academic_status: req.body.academic_status

        });
        console.log("create teacherAcademic",teacherAcademic)
        await teacherAcademic.save();
        res.send(teacherAcademic);
  
}

exports.getTeacherAcademic = async (req, res, next) => {

        const teacherAcademic = await TeacherAcademic.find();
        if(!teacherAcademic) res.status(404).send("The teacher academic doesn't exist")
        else res.send(teacherAcademic);
   
}

exports.getTeacherAcademicById = async (req, res, next) => {
    const teacherAcademic = await TeacherAcademic.findById(req.params.id);
    if (!teacherAcademic) res.status(404).send("The teacher academic doesn't exist");
    else res.send(teacherAcademic);

}

exports.updateTeacherAcademic = async (req, res, next) => {
    const { error } = validateTeacherAcademic(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const teacherAcademic = await TeacherAcademic.findByIdAndUpdate(req.params.id, {
        university_name: req.body.university_name,
        academic_major: req.body.academic_major,
        academic_period: req.body.academic_period,
        academic_evidence: req.body.academic_evidence,
        academic_description: req.body.academic_description,
        academic_status: req.body.academic_status
    }, { new: true });
    if(!teacherAcademic) res.status(404).send("The teacher academic doesn't exist")
    else  res.send(teacherAcademic);

}

exports.deleteTeacherAcademic = async (req, res, next) => {
    const teacherAcademic = await TeacherAcademic.findByIdAndDelete(req.params.id);
    if (!teacherAcademic) res.status(404).send("The teacher academic doesn't exist");
    else res.send(teacherAcademic);

}


