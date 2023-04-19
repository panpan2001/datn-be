let {Account, validate} = require('../models/Account.Model')


exports.createAccount = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let account = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role_id: req.body.role_id,
        is_deleted: req.body.is_deleted,
        avatar: req.body.avatar
    });
    await account.save();
    res.send(account);
}

exports.getAccount = async (req, res, next) => {
    const accounts = await Account.find();
    res.send(accounts);

}

exports.getAccountById = async (req, res, next) => {
    const account = await Account.findById(req.params.id);
    res.send(account);
}


exports.updateAccount = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const account = await Account.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role_id: req.body.role_id,
        is_deleted: req.body.is_deleted,
        avatar: req.body.avatar
    }, { new: true });
    res.send(account);

}

exports.deleteAccount = async (req, res, next) => {
    const account = await Account.findByIdAndDelete(req.params.id);
    if(!account) res.status(404).send("The account doesn't exist")
    res.send(account);
}
