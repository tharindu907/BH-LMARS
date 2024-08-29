const utils = require('../utils');
let User = require('../models/user.model');

const addUser = async (req, res) => {
    try {
        const role = req.body.role;
        const usercode = await utils.getNextSequenceValue('user_id') + 100;

        const newUser = new User({
            _id: (role === "Teacher" ? "A" : "N") + String(usercode), // if role is teacher, "A" is assigned. Else "N" is assigned
            username: utils.generateUsername(req.body.first_name, req.body.last_name, usercode),
            password: utils.generatePassword(),
            ...req.body
        });
    
        await newUser.save();
        res.json('User Added');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    } 
}

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }, '_id first_name last_name');
        res.json(admins);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
}

const countTeachers = async (req, res) => {
    try {
        const teacherCount = await User.countDocuments({ role: 'Teacher' });
        res.json(teacherCount);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    addUser,
    getAdmins,
    countTeachers
}