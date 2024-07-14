const utils = require('../utils');
let User = require('../models/user.model');

async function addUser(req, res){
    try {
        const role = req.body.role;
        const usercode = await utils.getNextSequenceValue('user_id') + 100;

        const newUser = new User({
            _id: (role === "Teacher" ? "A" : "N") + String(usercode),
            username: utils.generateUsername(req.body.name.first_name, req.body.name.last_name, usercode),
            password: utils.generatePassword(),
            ...req.body
        });
    
        await newUser.save();
        res.json('User Added');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    } 
}

module.exports = {
    addUser
}