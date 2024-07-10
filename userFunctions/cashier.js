const utils = require('../utils');
let Cashier = require('../models/cashier.model');

async function addCashier(req, res){
    try {
        const newCashiercode = await utils.getNextSequenceValue('nonacademic_id') + 100;

        const newCashier = new Cashier({
            _id: 'N' + String(newCashiercode),
            username: utils.generateUsername(req.body.name.first_name, req.body.name.last_name, newCashiercode),
            password: utils.generatePassword(),
            ...req.body
        });
    
        await newCashier.save();
        res.json('Cashier Added');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    } 
}

module.exports = {
    addCashier
};