const { CourseCategory, validateCourseCategory } = require('../models/CourseCategory.Model')

exports.createCourseCategory = async (req, res, next) => {
  
        const { error } = validateCourseCategory(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const id_course = await CourseCategory.findById(req.body.id_course);
        if (!id_course) return res.status(404).send("The course doesn't exist")
        else {
            const courseCategory = new CourseCategory({
                id_course: req.body.id_course,//
                type: req.body.type,
                level: req.body.level,
                description: req.body.description

            });
            await courseCategory.save();
            res.send(courseCategory);
        }
   
}

exports.getAllCourseCategories = async (req, res, next) => {
 
        const courseCategories = await CourseCategory.find();
        if (!courseCategories) res.status(404).send("Can't find course category")
        else res.send(courseCategories);
  
}

exports.getCourseCategoryById = async (req, res, next) => {
        const courseCategory = await CourseCategory.findById(req.params.id);
        if (!courseCategory) res.status(404).send("The course category doesn't exist")
        else res.send(courseCategory);
   
}

exports.updateCourseCategory = async (req, res, next) => {
        const { error } = validateCourseCategory(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        else {
            const courseCategory = await CourseCategory.findByIdAndUpdate(req.params.id, {
                id_course: req.body.id_course,
                type: req.body.type,
                level: req.body.level,
                description: req.body.description
            },
                { new: true });
            if (!courseCategory) res.status(404).send("The course category doesn't exist")
            else res.send(courseCategory);
        }
    
 
}
exports.deleteCourseCategory = async (req, res, next) => {
    const courseCategory = await CourseCategory.findByIdAndDelete(req.params.id);
    if (!courseCategory) res.status(404).send("The course category doesn't exist")
    else res.send(courseCategory);
}
