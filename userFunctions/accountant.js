const utils = require('../utils');
let Accountant = require('../models/accountant.model');

async function addAccountant(req, res){
    try {
        const newAccountantcode = await utils.getNextSequenceValue('nonacademic_id') + 100;

        const newAccountant = new Accountant({
            _id: 'N' + String(newAccountantcode),
            username: utils.generateUsername(req.body.name.first_name, req.body.name.last_name, newAccountantcode),
            password: utils.generatePassword(),
            ...req.body
        });
    
        await newAccountant.save();
        res.json('Accountant Added');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    } 
}

module.exports = {
    addAccountant
};