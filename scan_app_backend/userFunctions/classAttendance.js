// Import the required model
let classAttendance = require('../models/classAttendance.model');

const addAttendee = async (req,res) => {
    const {classId, studentId, currentMonth} = req.body;

    try {
        // Log the student ID to verify correctness
        console.log('Student ID:', studentId);

        // Generate the current attendance time
        const currentTime = new Date().toTimeString().split(' ')[0].replace(/:/g, '').substring(0, 6); // "HHMM"

        // Update the class document with the new attendee
        await classAttendance.findOneAndUpdate(
            { _id: classId },
            {
                $push: {
                    attendees: {
                        studentId: studentId,
                        timeAttended: currentTime
                    }
                }
            },
            { 
                new: true, 
                upsert: true // If the class document doesn't exist, create a new one
            }
        );
        
        console.log('Attendee added');
    } catch (error) {
        console.error('Error adding attendee:', error);
        throw error;
    }
}

module.exports = {
    addAttendee
};
