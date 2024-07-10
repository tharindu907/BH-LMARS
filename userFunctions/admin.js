const utils = require('../utils');
let Admin = require('../models/admin.model');

async function addAdmin(req, res){
    try {
        const newAdmincode = await utils.getNextSequenceValue('nonacademic_id') + 100;

        const newAdmin = new Admin({
            _id: 'N' + String(newAdmincode),
            username: utils.generateUsername(req.body.name.first_name, req.body.name.last_name, newAdmincode),
            password: utils.generatePassword(),
            ...req.body
        });
    
        await newAdmin.save();
        res.json('Admin Added');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    } 
}

module.exports = {
    addAdmin
};