const router = require('express').Router();
const utils = require('../utils');
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Student.find()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    try {
        const newstudentcode = await utils.getNextSequenceValue('studentid') + 1000;
        
        const newStudent = new Student({
            _id: 'S' + String(newstudentcode),
            ...req.body
        })
    
        await newStudent.save()
        res.json('Student Added')
    }  
    catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;