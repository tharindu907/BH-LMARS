const utils = require('../utils');
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

module.exports = {
    addStudent,
    getStudent
};