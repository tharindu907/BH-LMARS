const mongoose =  require('mongoose');
const utils = require('../utils');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: { 
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        required: true
    },
    nic_no: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    }, // "YYYY-MM-DD" // Mongoose  converts this string into a JavaScript Date object when saving it in server
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    personal_number: {
        type: String,
        validate: utils.mobileNumberValidator
    },
    whatsapp_number: {
        type: String,
        validate: utils.mobileNumberValidator
    },
    address: {
        type: String,
        required: true
    },
    registered_date: {
        type: Date,
        required: true
    },
    registered_by: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('user', userSchema);