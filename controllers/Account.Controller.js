const { json } = require('express');
let { Account, validate } = require('../models/Account.Model')


//get all accounts
exports.getAccount = async (req, res, next) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
console.log("get account successfully")
    } catch (error) {
        res.status(500).json(error);
    }

}

//get account by id
exports.getAccountById = async (req, res, next) => {
    const account = await Account.findById(req.params.id);
    res.send(account);
}


exports.updateAccount = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const account = await Account.findByIdAndUpdate(req.params.id, {
        role_name: req.body.role_name,
        full_name: req.body.username,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        is_deleted: req.body.is_deleted,
        avatar: req.body.avatar
    }, { new: true });
    res.json(account);

}

exports.deleteAccount = async (req, res, next) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        res.status(200).send("Account deleted").json(account);

    } catch (error) {
        res.status(500).json(error);
 
    }
}
