const mongoose = require('mongoose');

const classAttendanceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    attendees: [{
        studentId: { type: String, required: true },
        timeAttended: { type: String, required: true } // Store as "HHMM"
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('classAttendance', classAttendanceSchema);
