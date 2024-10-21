//const utils = require('../utils');
let Student = require('../models/student.model');
const crypto = require('crypto');

const addStudent = async (req, res) => {
    try {
        // Generate a temporary unique ID using a UUID
        const tempId = crypto.randomUUID();
        
        // Create the newStudent object with the temporary _id
        const newStudent = await Student.create({
            _id: tempId,
            qr_url: "null",
            ...req.body
        });

        // Now generate the student code
        const newstudentcode = 'S' + String(await utils.getNextSequenceValue('studentid') + 1000);
        
        // Generate the QR code
        const url = await utils.generateQRCodeWithText(newstudentcode, newStudent.first_name + " " + newStudent.last_name);
  
        // Create the updated student record with the correct ID and QR code
        const updatedStudent = await Student.create({
            _id: newstudentcode, // replace _id with the new one
            qr_url: url,
            ...req.body // update qr_url
        });

        // Delete the temporary student record
        await Student.findByIdAndDelete(tempId);

        // This method ensures that the counter is not increased if the student is not added. But the efficiency is lower in this method.

        res.json('Student Added');
    }  
    catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
};

function getStudent(req, res){
    Student.find()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err))
}

const countMaleandFemale = async (req, res) => {
    try {
        const maleCount = await Student.countDocuments({ gender: 'Male' });
        const femaleCount = await Student.countDocuments({ gender: 'Female' });
        res.json({ male: maleCount, female: femaleCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStudentById = async (req, res) => {
    const { id } = req.params; // Get the student ID from the request parameters

    try {
        const student = await Student.findById(id); // Find the student by ID

        if (!student) {
            return res.status(404).json({ message: 'Student not found' }); // Handle case when student is not found
        }

        res.json(student); // Return the student details
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};



module.exports = {
    addStudent,
    getStudent,
    countMaleandFemale,
    getStudentById // new function
};