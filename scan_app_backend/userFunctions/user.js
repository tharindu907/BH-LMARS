//const utils = require('../utils');
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

async function getTeacherIdFromName(teacherName) {
    const [firstName, lastName] = teacherName.split(' ');
    
    try {
        const teacherID = await User.findOne({ 
            first_name: firstName, 
            last_name: lastName,
            role: 'Teacher'
        }).select('_id');

        return teacherID._id;

    } catch (error) {
        console.error('Error getting the teacherID :', error);
        throw error;
    }
    
}

async function getNameFromTeacherIdforBackend(teacherID) {
    try {
        const teacherName = await User.findOne({ _id: teacherID, role: 'Teacher'}).select('first_name last_name');
        
        if (!teacherName) {
            return "Invalid TeacherID";
        }

        return `${teacherName.first_name} ${teacherName.last_name}`;

    } catch (error) {
        throw error;
    }
}

const getNameFromTeacherIdforFrontend = async (req, res) => {
    try {
        const teacherName = await getNameFromTeacherIdforBackend(req.query.teacherID);
        res.json({ teacherName });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teacher name' });
      }
}

module.exports = {
    addUser,
    getAdmins,
    countTeachers,
    getTeacherIdFromName,
    getNameFromTeacherIdforBackend,
    getNameFromTeacherIdforFrontend
}