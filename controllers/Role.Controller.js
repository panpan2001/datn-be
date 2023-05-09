let { Role, validateRole } = require('../models/Role.Model')

exports.createRole = async (req, res, next) => {

    const { error } = validateRole(req.body);
    if (error) {
        console.log("error");
        return res.status(400).send(error.details[0].message);
    }
    let role = new Role({
        name: req.body.name,
    });
    await role.save();
    res.send(role);
}
exports.getAllRoles = async (req, res, next) => {
   
        const roles = await Role.find();
        if(!roles) res.status(404).send("The role doesn't exist")
        else res.send(roles)
    
   
    // res.status(200).json(roles);
}

exports.getRoleById = async (req, res, next) => {
    const role = await Role.findById(req.params.id);

    if (!role) res.status(404).send("The role doesn't exist")
    else res.send(role);
    // res.status(200).json(role);
}

exports.updateRole = async (req, res, next) => {
    const { error } = validateRole(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const role = await Role.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    },
     { new: true });
    if(!role) res.status(404).send("The role doesn't exist")
    else res.send(role);
}

exports.deleteRole = async (req, res, next) => {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) res.status(404).send("The role doesn't exist")
    else res.send(role);
}