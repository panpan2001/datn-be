const { Parent, validateParent } = require('../models/Parent.Model')

exports.createParent = async (req, res, next) => {

    const { error } = validateParent(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // const id_student= await Parent.findById(req.body.id_student);// thsy bang student
    // const child_name= await Parent.findById(req.body.child_name);// thsy bang student
    const parent = new Parent({
        name: req.body.name,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        email: req.body.email,
        address: req.body.address,
        child_name: req.body.child_name,
        id_student: req.body.id_student,//
        id_rating_teacher: req.body.id_rating_teacher,//

    })
    await parent.save();
    res.status(200).json(parent);


}

exports.getParent = async (req, res, next) => {
    const parents = await Parent.find();
    if(!parents) res.status(404).send("Can't find parent")
    else res.send(parents)
}

exports.getParentById = async (req, res, next) => {
    const parent = await Parent.findById(req.params.id);
    if (!parent) res.status(404).send("The parent doesn't exist")
    else res.send(parent);

}

exports.updateParent = async (req, res, next) => {
    const { error } = validateParent(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const parent = await Parent.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        email: req.body.email,
        address: req.body.address,
        child_name: req.body.child_name,
        id_student: req.body.id_student,//
        id_rating_teacher: req.body.id_rating_teacher//

    }, { new: true });
    if(!parent) res.status(404).send("The parent doesn't exist")
    else res.send(parent);
}

exports.deleteParent = async (req, res, next) => {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) res.status(404).send("The parent doesn't exist")
    else res.send(parent);
}