const mongoose = require('mongoose');

const classAttendanceSchema = new mongoose.Schema({
    _id: { // this _id is picked from the _id from classes object of the dailyClassSchedule model "ESIN106.2024-08-28.1000"
        type: String,
        required: true
    },
    attendees: [{ 
        studentId: { // studentID
            type: String,
            required: true
        },
        timeAttended: {
            type: Date,
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('classAttendance', classAttendanceSchema);