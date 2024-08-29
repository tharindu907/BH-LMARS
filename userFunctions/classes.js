const utils = require('../utils');
let Classes = require('../models/classes.model');

const addClass = async (req, res) => {
    try{
        const newclasscode = await utils.getNextSequenceValue('classid')  + 100;

        const newClasses = new Classes({
            _id: (req.body.medium[0] + (req.body.subject).substring(0, 3)).toUpperCase() + String(newclasscode),
            ...req.body
        })

        await newClasses.save();
        res.json('Class Added');
    }
    catch (err){
        res.status(400).json(`Error: ${err}`);
    }
}

const countClasses = async (req, res) => {
    try {
        const classCount = await Classes.countDocuments();
        res.json(classCount);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const timetablehandlerfilter = async (req,res) => {
    const { grade, subject, teacher } = req.query;
    // req.query contains the query parameters sent by the client. If any of these parameters are included in the request, they will be assigned to the corresponding variables

    const query = {};
    if (grade) query.grade = grade;
    if (subject) query.subject = subject;
    if (teacher) query.teacherid = teacher;

    try {
        const subjects = await Classes.distinct('subject', query);
        const grades = await Classes.distinct('grade', query);
        const teachers = await Classes.distinct('teacherid', query);
        // For example, if query is { grade: '10', subject: 'Math' }, this will return the IDs of all unique teachers who teach Math in grade 10.

        res.json({ subjects, grades, teachers });
    } catch (error) {
        res.status(500).json({ message: "Error updating query based on the user's selected criteria ", error });
    }
}

async function getClassesForDay(dayOfWeek) {
    try {
        // Query the database for classes on the same day
        const classes = await Classes.find({ day: dayOfWeek }).exec(); // ".exec()" returns a promise and async/await will handle the asynchronous operation.
        
        return  classSchedule = classes.map(cls => ({
            classId: cls._id,
            startTime: cls.time.from,
            endTime: cls.time.to,
            _id: cls._id + cls.time.from.getTime() // getTime() converts to the number of milliseconds from January 1, 1970, 00:00:00 UTC
        }));
    } catch (err) {
        console.error('Error fetching class for ', dayOfWeek, ' : ', err);
        throw err;
    }
}

module.exports = {
    addClass,
    countClasses,
    timetablehandlerfilter,
    getClassesForDay
}