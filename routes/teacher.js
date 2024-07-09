const router = require('express').Router();
const utils = require('../utils');
let Teacher = require('../models/teacher.model');

router.route('/').get((req, res) => {
    Teacher.find()
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    try {
        const newteachercode = await utils.getNextSequenceValue('teacherid')  + 100;

        const newTeacher = new Teacher({
            _id: 'A' + String(newteachercode),
            username: utils.generateUsername(req.body.name.first_name, req.body.name.last_name, newteachercode),
            password: utils.generatePassword(),
            ...req.body
        })
    
        await newTeacher.save()
        res.json('Teacher Added')
    }  
    catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;