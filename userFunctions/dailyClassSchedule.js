let DailyClassSchedule = require('../models/DailyClassSchedule.model');
let classFucntions = require('./classes');

async function updateDailyClassSchedule(date) { // '2024-08-26'
    try {
        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        // Get the list of classes for the specific day
        const classSchedule = await classFucntions.getClassesForDay(dayOfWeek);
        
        // Check if the date exists in the database
        let isDateExists = await DailyClassSchedule.findOne({ date });

        if (!isDateExists) {
            // If the date doesn't exist, create a new record
            await DailyClassSchedule.create({
                _id: date,
                classes: classSchedule
            });
        }
            // if date exists and Update should be done, use the esle statement 

            // await dailySchedule.save();          
        
    } catch (err) {
        console.error('Error updating class schedule for the date', date, ':', err);
        throw err;
    }
}


module.exports = {
    updateDailyClassSchedule
}