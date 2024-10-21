const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    role: String,
    nic_no: String,
    date_of_birth: Date,
    gender: { type: String, enum: ['Male', 'Female'] },
    email: String,
    address: String,
    registered_date: Date,
    registered_by: String
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);