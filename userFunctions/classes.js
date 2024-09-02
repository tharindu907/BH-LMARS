const utils = require('../utils');
let Classes = require('../models/classes.model');
const userFunctions = require('./user');

const addClass = async (req, res) => {
    try{
        const newclasscode = await utils.getNextSequenceValue('classid')  + 100;

        const newClasses = new Classes({
            _id: (req.body.medium[0] + (req.body.subject).substring(0, 3)).toUpperCase() + String(newclasscode),
            ...req.body 
            // time should be "1200" (HHMM) 
            // 1970-01-01T11:00:00.000+00:00 <- 'Date' format
            // to convert data format to required format .toTimeString().split(' ')[0].replace(/:/g, '').substring(0, 4)
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

async function getDetialsForTimeTable({classIDs, subject = null, grade = null, teacher = null}){

    const query = {
        _id: { $in: classIDs }
    };
    if (grade) query.grade = grade;
    if (subject) query.subject = subject;
    if (teacher) {
        query.teacherid = await userFunctions.getTeacherIdFromName(teacher);
    }

    try{
        const details = await Classes.find(query).select('_id subject grade teacherid');

        const results = details.map(cls => ({
            _id: cls._id,
            subject: cls.subject,
            grade: cls.grade,
            teacher: userFunctions.getNameFromTeacherId(cls.teacherid)
        }))
        return results;

    } catch (error) {
        console.error('Error getting details for the classes:', error);
        throw error;
    }
}

async function getClassesForDay(date, dayOfWeek) {
    try {
        // Query the database for classes on the same day
        const classes = await Classes.find({ day: dayOfWeek }).exec(); // ".exec()" returns a promise and async/await will handle the asynchronous operation.
        
        return  classSchedule = classes.map(cls => ({
            classId: cls._id,
            startTime: cls.time.from,
            endTime: cls.time.to,
            classCode: cls._id + "." + date + "." + cls.time.from
        }));
    } catch (err) {
        console.error('Error fetching class for ', dayOfWeek, ' : ', err);
        throw err;
    }
}

module.exports = {
    addClass,
    countClasses,
    getClassesForDay,
    getDetialsForTimeTable
}