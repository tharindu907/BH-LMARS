const utils = require('../utils');
let Student = require('../models/student.model');

async function addStudent(req, res){
    try {
        const newstudentcode = 'S' + String(await utils.getNextSequenceValue('studentid') + 1000);
        
        const newStudent = new Student({
            _id: newstudentcode,
            qr_url: await utils.generateQRCodeWithText(newstudentcode, req.body.name.first_name + " " + req.body.name.last_name),
            ...req.body
        })
    
        await newStudent.save()
        res.json('Student Added')
    }  
    catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
}

function getStudent(req, res){
    Student.find()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = {
    addStudent,
    getStudent
};