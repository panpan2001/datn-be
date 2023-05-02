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
// const accountRoutes=require('./routes/Account.Route');
const roleRoutes=require('./routes/Role.Route');
const authorizationRoutes=require('./routes/Auth.Route')

//add middleware
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//add route
app.use('/api/roles',roleRoutes)
app.use('/api/auth',authorizationRoutes)


db.connect()
const port= process.env.PORT||8080

app.listen(port,()=>console.log("Port is open at",port))

//authentication : login
//authorization : sign up - role permission 



