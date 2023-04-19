let {Role,validate} = require('../models/Role.Model')

exports.createRole = async (req, res, next) => {
    
    const { error } = validate(req.body);
    if (error) {
        console.log("error");
        return res.status(400).send(error.details[0].message);}
    let role = new Role({
        name: req.body.name,
    });
    await role.save();
    res.send(role);
}
exports.getRole = async (req, res, next) => {
    const roles = await Role.find();
    res.send(roles);
}

exports.getRoleById = async (req, res, next) => {
    const role = await Role.findById(req.params.id);
    res.send(role);
}

exports.updateRole = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const role = await Role.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true });
    res.send(role);
}

exports.deleteRole = async (req, res, next) => {
    const role = await Role.findByIdAndDelete(req.params.id);
    if(!role) res.status(404).send("The role doesn't exist")
    res.send(role);
}