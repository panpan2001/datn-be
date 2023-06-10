// add library
const express = require('express');
const db= require('./configs/database');
const bodyParser = require("body-parser")
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser=require('cookie-parser')

//create app 
dotenv.config()
const  app = express();

//create route 
//authentication : login
//authorization : sign up - role permission 
const roleRoutes=require('./routes/Role.Route');
const authRoutes=require('./routes/Auth.Route')
const accountRoutes=require('./routes/Account.Route');
const adminRoutes=require('./routes/Admin.Route');
const teacherRoutes=require('./routes/Teacher.Route');
const parentRoutes=require('./routes/Parent.Route');
const courseCategoryRoutes=require('./routes/CourseCategory.Route');
const teacherAcademicRoutes=require('./routes/TeacherAcademic.Route');
const teacherDegreeRoutes=require('./routes/TeacherDegree.Route');
const studentRoutes=require('./routes/Student.Route');
const courseRoutes=require('./routes/Course.Route');
const courseStudentRoutes=require('./routes/CourseStudent.Route');
const studentRatingRoutes=require('./routes/StudentRating.Route');
const parentRatingRoutes=require('./routes/ParentRating.Routes');
const demoCourseStudentRoutes=require('./routes/DemoCourseStudent.Route');
const demoCourseRoutes=require('./routes/DemoCourse.Route');

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//add middleware
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//add route
app.use('/api/roles',roleRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/accounts',accountRoutes)
app.use('/api/admins',adminRoutes)
app.use('/api/teachers',teacherRoutes)
app.use('/api/parents',parentRoutes)
app.use('/api/courseCategories',courseCategoryRoutes)
app.use('/api/teacherAcademics',teacherAcademicRoutes)
app.use('/api/teacherDegrees',teacherDegreeRoutes)
app.use('/api/students',studentRoutes)
app.use('/api/courses',courseRoutes)
app.use('/api/courseStudents',courseStudentRoutes)
app.use('/api/studentRatings',studentRatingRoutes)
app.use('/api/parentRatings',parentRatingRoutes)
app.use('/api/demoCourseStudents',demoCourseStudentRoutes)
app.use('/api/demoCourses',demoCourseRoutes)

db.connect()
const port= process.env.PORT||8080

app.listen(port,()=>console.log("Port is open at",port))








