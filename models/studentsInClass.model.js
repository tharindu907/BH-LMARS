const mongoose = require('mongoose');

const studentsInClassSchema = new mongoose.Schema({
    _id: { // 'classID'+ '.' + 'academic year'
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
            month: { //  "yyyy-mm"
                type: String,
                required: true
            },
            paymentStatus: {
                type: Boolean,
                required: true
            },
            paymentDate: {
                type: Date,
                required: true
            }
        }]
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('studentsInClass', studentsInClassSchema);