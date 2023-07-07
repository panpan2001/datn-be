const { json } = require('express');
let { Account, validateAccount } = require('../models/Account.Model')
let { Student } = require('../models/Student.Model')
let { Teacher } = require('../models/Teacher.Model')
//get all accounts
exports.getAllAccounts = async (req, res, next) => {

    const accounts = await Account.find();
    console.log(accounts.length)
    if (!accounts) return res.status(404).send("Accounts not found")
    else res.status(200).json(accounts);
}

//get account by id
exports.getAccountById = async (req, res, next) => {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).send("Account not found")
    else res.send(account);
}


exports.updateAccount = async (req, res, next) => {
    const { error } = validateAccount(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const account = await Account.findByIdAndUpdate(req.params.id, {
        full_name: req.body.username,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        // is_deleted: req.body.is_deleted,
        // avatar: req.body.avatar,
        // messageFromSystem: req.body.messageFromSystem,
        // seenMessage: req.body.seenMessage
    }, { new: true });
    if (!account) return res.status(404).send("Account not found")
    else res.json(account);

}

exports.updateAccountStatus = async (req, res, next) => {
    // const find= await Account.findById(req.params.id);
    //check account student dc mo khoa thi cac danh gia se tra ve 0 va false 
    console.log("req.body.is_deleted",req.body.is_deleted)
    const account = await Account.findByIdAndUpdate(req.params.id, {
        is_deleted: !req.body.is_deleted
    }, { new: true });
    if (!account) return res.status(404).send("Account not found")
    else {
        const newAccounts = await Account.find();
        res.status(200).send(newAccounts);
    }
}

exports.deleteAccount = async (req, res, next) => {
    const account = await Account.findByIdAndDelete(req.params.id);
    console.log("account deleted:", account)
    if (!account) {
        return res.status(404).send("Account not found")
    }
    else {
        if (account.role_name == 'student') {
            console.log("student")
            const student = await Student.findOneAndDelete({ account_id: account._id });
            console.log({ student })
            const newAccounts = await Account.find();
            // const course_student= await CourseStudent.deleteMany({id_student: student._id})
            // const demo_course_student= await DemoCourseStudent.deleteMany({id_student: student._id})
            console.log("newAccounts.length: ", newAccounts.length)
            res.status(200).send(newAccounts);
        }
        else if (account.role_name == 'teacher') {
            console.log("teacher")
            const teacher = await Teacher.findOneAndDelete({ account_id: account._id });
            console.log({ teacher })
            const newAccounts = await Account.find();
            console.log("newAccounts.length: ", newAccounts.length)
            res.status(200).send(newAccounts);
           
        }
       
    }


}


