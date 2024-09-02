let classAttendance = require('../models/classAttendance.model');
const studentsInClass = require('../models/studentsInClass');

async function addAttendee(classId, studentId, currentMonth) { // "YYYY-MM-DD"
    try {

        const paymentDone = await studentsInClass.isPaymentDone(classId, studentId, currentMonth);
        
        if (!paymentDone) {
            console.log('Payment not done for the month, attendance not marked');
            return;
        }

        const currentTime = new Date().toTimeString().split(' ')[0].replace(/:/g, '').substring(0, 6); // "HHMM"

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
}