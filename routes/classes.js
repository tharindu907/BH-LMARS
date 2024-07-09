const router = require('express').Router();
const utils = require('../utils');
let Classes = require('../models/classes.model');

router.route('/').get((req, res) => {
    Classes.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    try{
        const newclasscode = await utils.getNextSequenceValue('classid')  + 10;

        const newClasses = new Classes({
            _id: req.body.medium[0] + req.body.subject + String(newclasscode),
            ...req.body
        })

        await newClasses.save();
        res.json('Class Added');
    }
    catch (err){
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;