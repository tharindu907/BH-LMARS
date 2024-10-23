let classAttendance = require('../models/classAttendance.model');
const studentsInClass = require('../models/studentsInClass.model');

const addAttendee = async (req,res) => {
    const {classId, studentId, date, startTime} = req.body; //date: "YYYY-MM-DD", startTime: "HH:MM"

    try {

        const existingAttendance = await classAttendance.findOne({
            _id: `${classId}.${date}.${startTime}`,
            "attendees.studentId": studentId
        });

        if (existingAttendance) {
            return res.status(200).json({isMarked: true, success: false});
        }

        await classAttendance.findOneAndUpdate(
            { _id: `${classId}.${date}.${startTime}` },
            {
                $push: {
                    attendees: {
                        studentId: studentId,
                        timeAttended: new Date().toTimeString().split(' ')[0] // "HH:MM:SS"
                    }
                }
            },
            { 
                new: true, 
                upsert: true
            }
        );
        
        res.status(200).json({isMarked: false, success: true});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getStudentAttendance = async (req, res) => {
    try {
        
        const { searchStudent, searchClass, year, month } = req.body;
        
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
        const regex = new RegExp(`^${searchClass}.${year}-${monthNumber}.*$`);

        const classRecords = await classAttendance.find({ _id: { $regex: regex } });

        const attendanceDetails = [];

        classRecords.forEach(record => {
            const date = record._id.split('.')[1]; // Extract the date (YYYY-MM-DD) from _id

            const studentAttendance = record.attendees.find(attendee => attendee.studentId === searchStudent);

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