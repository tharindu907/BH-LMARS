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
    catch (err) {
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
    try{
        const query = {
            _id: { $in: classIDs }
        };
        if (grade) query.grade = grade;
        if (subject) query.subject = subject;
        if (teacher) {
            query.teacherid = await userFunctions.getTeacherIdFromName(teacher);
        }

        const details = await Classes.find(query).select('_id subject grade teacherid medium');

        const results = await Promise.all(details.map(async cls => ({ //Promise.all to handle the asynchronous function inside the map function
            _id: cls._id,
            subject: cls.subject,
            grade: cls.grade,
            medium: cls.medium,
            teacher: await userFunctions.getNameFromTeacherIdforBackend(cls.teacherid)
        })));
        return results;

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSubjectNamesOfAllClasses = async (req, res) =>{
    try {
        const classes = await Classes.find({}, 'subject');
        
        const subjects = [...new Set(classes.map(cls => cls.subject))];

        res.json(subjects);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getGradesOfAllClasses = async (req, res) =>{
    try {
        const classes = await Classes.find({}, 'grade');
        
        const grades = [...new Set(classes.map(cls => cls.grade))];

        res.json(grades);
        
    } catch (err) {
        console.error('Error retrieving subjects:', err);
        throw err;
    }
}

async function getClassesForDay(date, dayOfWeek) {
    try {
        // Query the database for classes on the same day
        const classes = await Classes.find({ 'schedule.day': dayOfWeek }).exec(); // ".exec()" returns a promise and async/await will handle the asynchronous operation.
        const classSchedule = classes.flatMap(cls => {
            const schedulesForDay = cls.schedule.filter(sch => sch.day === dayOfWeek);
            return {
                classId: cls._id,
                startTime: schedulesForDay[0]['from'],
                endTime: schedulesForDay[0]['to'],
                classCode: `${cls._id}.${date}.${schedulesForDay[0]['from']}`
            };
        });
        return classSchedule;
    } catch (err) {
        console.error('Error fetching class for ', dayOfWeek, ' : ', err);
        throw err;
    }
}

const getClassByDetails = async (req, res) => {
    const { subject, grade, medium, teacher } = req.body;
    
    try {
        const teacherID = await userFunctions.getTeacherIdFromName(teacher);

        const classData = await Classes.findOne({
            subject: subject,
            grade: grade,
            medium: medium,
            teacherid: teacherID
        }, '_id');

        res.json(classData ? classData._id : null);
    } catch (err) {
        console.error('Error fetching class by details:', err);
        throw err; // Handle errors properly in your implementation
    }
}

const getClass = async(req, res) => {
    try {
        const classId = req.params.id;

        const classdetails = await Classes.findById(classId);

        if (!classdetails){
            return res.json(null);
        }

        const teacherName = await userFunctions.getNameFromTeacherIdforBackend(classdetails.teacherid);
        
        res.json({
            classdetails,
            teacherName
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllClassesForTeacher = async(req, res) => {
    try {
        const teacherId = req.params.id;

        const classes = await Classes.find({ teacherid: teacherId });

        res.json(classes);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateClassDetails = async(req, res) => {
    const id = req.params.id;
    const { fee, schedule } = req.body; 

    try {

        await Classes.findByIdAndUpdate(
          id,
          {
            $set: { 
              fee: fee,
              schedule: schedule
            }
          },
          { new: true } 
        );

        res.status(200).json({ message: 'Class updated successfully'});

    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
}

const getClassDetails = async (req, res) => {
    try {
        const classes = await Classes.find();

        const classesWithTeacherNames = await Promise.all(
            classes.map(async (singleClass) => {

                return {
                    ...singleClass.toObject(),  
                    teacherName: await userFunctions.getNameFromTeacherIdforBackend(singleClass.teacherid)
                };
            })
        );

        res.status(200).json(classesWithTeacherNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

module.exports = {
    addClass,
    countClasses,
    getClassesForDay,
    getDetialsForTimeTable,
    getSubjectNamesOfAllClasses,
    getGradesOfAllClasses,
    getClassByDetails,
    getClass,
    getAllClassesForTeacher,
    updateClassDetails,
    getClassDetails
}