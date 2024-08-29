const mongoose = require('mongoose');

const dailyClassScheduleSchema = new mongoose.Schema({
    _id: { // this saves the date, as date is unique
        type: String, 
        required: true
    },
    classes: [{
        _id:{
            type: String,
            required: true
        },
        classId: { 
            type: String, 
            required: true 
        },
        startTime: { 
            type: Date, 
            required: true 
        },
        endTime: { 
            type: Date, 
            required: true 
        }
    }]
}, {
    timestamps: true  
});

module.exports = mongoose.model('DailyClassSchedule', dailyClassScheduleSchema);