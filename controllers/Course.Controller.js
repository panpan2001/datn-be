let { Course, validateCourse } = require('../models/Course.Model');
const { Teacher } = require('../models/Teacher.Model');
const {CourseCategory}=require('../models/CourseCategory.Model')

exports.createCourse = async (req, res, next) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const id_teacher= await Teacher.findById(req.body.id_teacher);
    if(!id_teacher) res.status(400).send("Teacher doesn't exist")
    const category_id= await CourseCategory.findById(req.body.category_id);
    if(!category_id) res.status(400).send("Category doesn't exist")
    const course = new Course({
            id_teacher: req.body.id_teacher,
            name: req.body.name,
            category_id: req.body.category_id,
            description: req.body.description,
            number_of_student: req.body.number_of_student,
            schedule: req.body.schedule,
            time_per_lesson: req.body.time_per_lesson,
            cost: req.body.cost,
        });
        await course.save();
        res.send(course);
    
}

exports.getAllCourses = async (req, res, next) => {
    
    const courses = await Course.find();
    if(!courses) res.status(404).send("The course doesn't exist")
    else res.send(courses);

}

exports.getCourseById = async (req, res, next) => {
    
    const course = await Course.findById(req.params.id);
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course);
}

exports.updateCourse = async (req, res, next) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = await Course.findByIdAndUpdate(req.params.id, {
        id_teacher: req.body.id_teacher,
        name: req.body.name,
        category_id: req.body.category_id,
        description: req.body.description,
        number_of_student: req.body.number_of_student,
        schedule: req.body.schedule,
        time_per_lesson: req.body.time_per_lesson,
        cost: req.body.cost,
    },
     { new: true });
    if(!course) res.status(404).send("The course doesn't exist")
    else res.send(course);
}

exports.deleteCourse = async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course);
}