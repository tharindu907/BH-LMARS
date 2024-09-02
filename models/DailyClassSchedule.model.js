const mongoose = require('mongoose');

const dailyClassScheduleSchema = new mongoose.Schema({
    _id: { // this saves the date, as date is unique ''yyyy-mm-dd"
        type: String, 
        required: true
    },
    classes: [{
        classCode:{ // "ESIN106.2024-08-28.1000"
            type: String,
            required: true
        },
        classId: { 
            type: String, 
            required: true 
        },
        startTime: { 
            type: String, 
            required: true 
        },
        endTime: { 
            type: String, 
            required: true 
        }
    }]
}, {
    timestamps: true  
});

module.exports = mongoose.model('dailyClassSchedule', dailyClassScheduleSchema);