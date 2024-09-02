const mongoose = require('mongoose');

const studentsInClassSchema = new mongoose.Schema({
    _id: { // classID
        type: String,
        required: true
    },
    studentsRegistered: [{
        studentId: { // studentID
            type: String,
            required: true,
        },
        registeredDate: {
            type: Date,
            required: true
        },
        payments: [{
            paymentId: { // if the payment is done, the "yyyy-mm" is added as the _id
                type: String, // e.g., "2024-09"
                required: true
            },
        }]
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('studentsInClass', studentsInClassSchema);