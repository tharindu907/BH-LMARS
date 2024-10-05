let classAttendance = require('../models/classAttendance.model');
const studentsInClass = require('../models/studentsInClass.model');

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

const getStudentAttendance = async (req, res) => {
    try {
        
        const { student, classId, year, month } = req.body;
        
        const months = {
            "January": "01",
            "February": "02",
            "March": "03",
            "April": "04",
            "May": "05",
            "June": "06",
            "July": "07",
            "August": "08",
            "September": "09",
            "October": "10",
            "November": "11",
            "December": "12"
        };

        const monthNumber = months[month];

        // Construct the regex to match the classID and the year-month
        const regex = new RegExp(`^${classId}.${year}-${monthNumber}.*$`);

        const classRecords = await classAttendance.find({ _id: { $regex: regex } });

        const attendanceDetails = [];

        classRecords.forEach(record => {
            const date = record._id.split('.')[1]; // Extract the date (YYYY-MM-DD) from _id

            const studentAttendance = record.attendees.find(attendee => attendee.studentId === student);

            attendanceDetails.push({
                date: date,
                present: !!studentAttendance, // true if student is found, false otherwise
                timeAttended: studentAttendance ? studentAttendance.timeAttended : null // time if present, null if absent
            });
        });

        res.json({ attendanceDetails });

    } catch (error) {
        console.error("Error fetching attendance records:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addAttendee,
    getStudentAttendance
}