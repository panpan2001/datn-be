const { Account } = require('../models/Account.Model');
const { Admin, validateAdmin } = require('../models/Admin.Model')

exports.createAdmin = async (req, res, next) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const account_id = await Account.findById(req.body.account_id);
    if (!account_id) return res.status(404).send("The account doesn't exist");
    else {
        const admin = new Admin({
            account_id: req.body.account_id,
        });
        await admin.save();
        res.send(admin);
    }

}

exports.getAllAdmins = async (req, res, next) => {

    const admins = await Admin.find();
    if (!admins) res.status(404).send("Can't find admin")
    else res.send(admins);

}

exports.getAdminById = async (req, res, next) => {
   
        const admin = await Admin.findById(req.params.id);
        if (!admin) res.status(404).send("The admin doesn't exist")
        else res.send(admin);
  
}


exports.deleteAdmin = async (req, res, next) => {

        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) res.status(404).send("The admin doesn't exist")
        else res.send(admin);
   
}