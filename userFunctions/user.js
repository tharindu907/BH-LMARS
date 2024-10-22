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

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findOne({ _id: userId});

        res.json(user);
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ message: 'Server error', error: error.message });
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

const getTeacherNames = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' }, 'first_name last_name');
        
        const teacherNames = [...new Set(teachers.map(teacher => `${teacher.first_name} ${teacher.last_name}`))];
        
        res.json(teacherNames);
        
    } catch (err) {
        console.error('Error retrieving teacher names:', err);
        res.status(500).json({ error: 'Failed to retrieve teacher names' });
    }
}

const getStaffDeatils = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'Teacher' } });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTeacherDetails = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });

        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        await User.findByIdAndUpdate(
            id, 
            {
                $set: { 
                    first_name: updatedData.firstname,
                    last_name: updatedData.lastname,
                    nic_no: updatedData.nic,
                    date_of_birth: updatedData.dob,
                    gender: updatedData.gender,
                    email: updatedData.email,
                    personal_number: updatedData.mobilenumber,
                    whatsapp_number: updatedData.whatsappnumber,
                    address: updatedData.address
                }
            }, 
            {
            new: true,
            runValidators: true,
          }
        );

        res.status(200).json({ message: 'User updated successfully'});
    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
}

module.exports = {
    addUser,
    getAdmins,
    countTeachers,
    getTeacherIdFromName,
    getNameFromTeacherIdforBackend,
    getNameFromTeacherIdforFrontend,
    getTeacherNames,
    getUser,
    getStaffDeatils,
    getTeacherDetails,
    updateUserDetails
    
}