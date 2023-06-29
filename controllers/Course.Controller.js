let { Course, validateCourse } = require('../models/Course.Model');
const { Teacher } = require('../models/Teacher.Model');
const { CourseCategory } = require('../models/CourseCategory.Model');
const { deleteCourseStudent } = require('./CourseStudent.Controller');
const { CourseStudent } = require('../models/CourseStudent.Model');
const { DemoCourseStudent } = require('../models/DemoCourseStudent.Model');
const { DemoCourse } = require('../models/DemoCourse.Model');
const { Account } = require('../models/Account.Model');

exports.createCourse = async (req, res, next) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id_teacher = await Teacher.findById(req.body.id_teacher)
    if (!id_teacher) res.status(400).send("Teacher doesn't exist")
    const category_id = await CourseCategory.findById(req.body.category_id)
    if (!category_id) res.status(400).send("Category doesn't exist")
    const course = new Course({
        id_teacher: req.body.id_teacher,
        name: req.body.name,
        category_id: req.body.category_id,
        description: req.body.description,
        number_of_student: req.body.number_of_student,
        schedule: req.body.schedule,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        time_per_lesson: req.body.time_per_lesson,
        learning_period: req.body.learning_period,
        cost: req.body.cost,
        image: req.body.image,
        link_video: req.body.link_video,
        link_meeeting: req.body.link_meeeting,
        isHidden: req.body.isHidden
    });
    await course.save();
    res.send(course);

}

exports.getAllCourses = async (req, res, next) => {

    const courses = await Course.find()
        .populate('category_id')
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            populate: {
                path: 'account_id',
                model: Account
            }
        }]);
    if (!courses) res.status(404).send("The course doesn't exist")
    else res.send(courses);

}

exports.getCourseById = async (req, res, next) => {

    const course = await Course.findById(req.params.id)
        .populate('category_id')
        .populate([{
            path: 'id_teacher',
            model: Teacher,
            populate: {
                path: 'account_id',
                model: Account
            }
        }]);
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course);
    // console.log({course})
}


exports.getAllCoursesByIdTeacher = async (req, res, next) => {
    const courses = await Course.find({ id_teacher: req.params.id })
        .populate('category_id')
        .populate([
            {
                path: 'id_teacher',
                model: Teacher,
                populate: {
                    path: 'account_id',
                    model: Account
                }
            }
        ]);
    if (!courses) res.status(404).send("The course doesn't exist")
    else res.status(200).send(courses);
    console.log(courses)

}

exports.updateCourse = async (req, res, next) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = await Course.findByIdAndUpdate(req.params.id, {
        // id_teacher: req.body.id_teacher,
        name: req.body.name,
        category_id: req.body.category_id,
        description: req.body.description,
        number_of_student: req.body.number_of_student,
        schedule: req.body.schedule,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        time_per_lesson: req.body.time_per_lesson,
        learning_period: req.body.learning_period,
        cost: req.body.cost,
        image: req.body.image,
        link_video: req.body.link_video,
        link_meeeting: req.body.link_meeeting,
        isHidden: req.body.isHidden
    },
        { new: true });
    if (!course) res.status(404).send("The course doesn't exist")
    else res.send(course);
}


exports.addLinkVideo = async (req, res, next) => {
    // console.log(req.body)
    // if (req.body.del_link_video.length > 0) {
        if(req.body.type=='Video'){
            const course = await Course.findOneAndUpdate({ _id: req.params.id },
                {
                    $pullAll: {
                        link_video: req.body.del_link_video
        
                    }
                }
        
            );
        
            const newcourse = await Course.findByIdAndUpdate(req.params.id,
                {
                    $addToSet:
                    {
                        link_video:
                        {
                            $each: req.body.link_video,
                            // $slice: 0, 
                        }
                    }
                })
            if (!newcourse) res.status(404).send("The course doesn't exist")
            else {
                res.send(newcourse).status(200);
                // console.log("course link video ", newcourse.link_video)
            }
                }
                else{
                    console.log(req.body)
                    const course = await Course.findOneAndUpdate({ _id: req.params.id },
                        {
                            $pullAll: {
                                link_meeeting: req.body.del_link_video
                
                            }
                        }
                
                    );
                
                    const newcourse = await Course.findByIdAndUpdate(req.params.id,
                        {
                            $addToSet:
                            {
                                link_meeeting:
                                {
                                    $each: req.body.link_video,
                                    // $slice: 0, 
                                }
                            }
                        })
                    if (!newcourse) res.status(404).send("The course doesn't exist")
                    else {
                        res.send(newcourse).status(200);
                        console.log("course link meeting ", newcourse.link_meeeting)
                    }
                }
  
}
// else {
//     const newcourse = await Course.findByIdAndUpdate(req.params.id,
//         {
//             $addToSet:
//             {
//                 link_video:
//                 {
//                     $each: req.body.link_video,
//                     // $slice: 0, 
//                 }
//             }
//         })
//     if (!newcourse) res.status(404).send("The course doesn't exist")
//     else {
//         res.send(newcourse).status(200);
//         console.log("course link video ", newcourse.link_video)
//     }
// }


// }

exports.deleteCourse = async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    // const courseStudent= await CourseStudent.findOne({ id_course: req.params.id })
    // if(courseStudent){
    await CourseStudent.deleteMany({ id_course: req.params.id })

    // }
    const demoCourse = await DemoCourse.findOne({ id_course: req.params.id })
    // if(demoCourse){
    await DemoCourse.deleteMany({ id_course: req.params.id })
    await DemoCourseStudent.deleteMany({ id_demo_course: demoCourse._id })

    // }
    if (!course) res.status(404).send("The course doesn't exist")
    else {
        //
        const newcourses = await Course.find({ id_teacher: course.id_teacher })
            .populate('category_id')
            .populate('id_teacher');
        res.send(newcourses)

    };
}

exports.adminDeleteCourse = async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    // const courseStudent= await CourseStudent.findOne({ id_course: req.params.id })
    // if(courseStudent){
    const a = await CourseStudent.deleteMany({ id_course: req.params.id })
    console.log("a", a)
    // }
    const demoCourse = await DemoCourse.findOne({ id_course: req.params.id })
    // console.log({demoCourse})

    if (demoCourse) {
        const b = await DemoCourse.deleteMany({ id_course: req.params.id })
        console.log("b", b)
        const num = await DemoCourseStudent.deleteMany({ id_demo_course: demoCourse._id })
        console.log("num", num)
    }
    if (!course) res.status(404).send("The course doesn't exist")
    else {
        //
        const newcourses = await Course.find()
            .populate('category_id')
            .populate('id_teacher');
        const newDemoCourses = await DemoCourse.find()
            .populate('id_course', {
                start_date: 0,
                end_date: 0,
                cost: 0,
                learning_period: 0,
                link_video: 0,
                link_meeting: 0
            })
        res.send({ newcourses, newDemoCourses })

    };
}

// {
//     $push: {
//       link_video: {
//         $each: [],
//         $slice: 0
//       }
//     }
//   },
//   {
//     multi: true
//   },
//     { $addToSet:
//         { link_video:
//             { $each: req.body.link_video,
//                 // $slice: 0,
//         } } },

// ,
//             {
//                 "arrayFilters": [
//                     {
//                       "link_video": req.body.link_video
//                     }
//                   ]
//                 }