// Existing imports and code
let Classes = require('../models/classes.model');
const userFunctions = require('./user');

const addClass = async (req, res) => {
    try {
        const newclasscode = await utils.getNextSequenceValue('classid') + 100;

        const newClasses = new Classes({
            _id: (req.body.medium[0] + (req.body.subject).substring(0, 3)).toUpperCase() + String(newclasscode),
            ...req.body
        });

        await newClasses.save();
        res.json('Class Added');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
};

const countClasses = async (req, res) => {
    try {
        const classCount = await Classes.countDocuments();
        res.json(classCount);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// New function to get all class details
const getAllClasses = async (req, res) => {
    try {
        const details = await Classes.find().select('_id subject grade teacherid time');
        const results = await Promise.all(details.map(async cls => ({
            _id: cls._id,
            subject: cls.subject,
            grade: cls.grade,
            time: cls.time,
            teacher: await userFunctions.getNameFromTeacherIdforBackend(cls.teacherid)
        })));
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Existing function to get details for a specific timetable
async function getDetialsForTimeTable({ classIDs, subject = null, grade = null, teacher = null }) {
    try {
        const query = {
            _id: { $in: classIDs }
        };
        if (grade) query.grade = grade;
        if (subject) query.subject = subject;
        if (teacher) {
            query.teacherid = await userFunctions.getTeacherIdFromName(teacher);
        }

        const details = await Classes.find(query).select('_id subject grade teacherid');

        const results = await Promise.all(details.map(async cls => ({
            _id: cls._id,
            subject: cls.subject,
            grade: cls.grade,
            teacher: await userFunctions.getNameFromTeacherIdforBackend(cls.teacherid)
        })));
        return results;

    } catch (error) {
        console.error('Error getting details for the classes:', error);
        throw error;
    }
}

async function getClassesForDay(date, dayOfWeek) {
    try {
        const classes = await Classes.find({ 'schedule.day': dayOfWeek }).exec();
        const classSchedule = classes.map(cls => {
            const scheduleForDay = cls.schedule.find(sch => sch.day === dayOfWeek);
            return {
                classId: cls._id,
                startTime: scheduleForDay.from,
                endTime: scheduleForDay.to,
                classCode: `${cls._id}.${date}.${scheduleForDay.from}`
            };
        });

        return classSchedule;
    } catch (err) {
        console.error('Error fetching class for ', dayOfWeek, ' : ', err);
        throw err;
    }
}

module.exports = {
    addClass,
    countClasses,
    getAllClasses, // Added new function here
    getClassesForDay,
    getDetialsForTimeTable
};
