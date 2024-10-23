let classFunctions = require('./classes');
let dailyClassSchedule = require('../models/dailyClassSchedule.model');
let Classes = require('../models/classes.model');
const userFunctions = require('./user');

async function updateDailyClassSchedule(date, { classId, startTime, endTime } = {}) { // '2024-08-26'
    try {     
        const result = await dailyClassSchedule.findOneAndUpdate(
            { _id: date },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        if (result.classes.length === 0) {
            
            const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
            const classSchedule = await classFunctions.getClassesForDay(date, day);
            await dailyClassSchedule.updateOne(
                { _id: date },
                { $set: { classes: classSchedule } }
            );
            
        } else if (classId && startTime && endTime) {

            const classCode = `${classId}.${date}.${startTime}`;

            const existingClass = isDateExists.classes.find(cls => cls.classCode === classCode);

            if (!existingClass) {
                // If the class doesn't exist, add it to the array
                await dailyClassSchedule.updateOne(
                    { _id: date }, 
                    { $push: { classes: { classCode, classId, startTime, endTime } } } // Add the new class to the classes array
                );
            } else {
                console.log(`Class ${classId} already exists for date ${date} from ${startTime} to ${endTime}.`);
            }
        }
      
    } catch (err) {
        console.error('Error updating class schedule for the date', date, ':', err);
        throw err;
    }
}

const timetablehandlerfilter = async (req,res) => {
    const { selectedDate, grade, subject, teacher } = req.query;
    // req.query contains the query parameters sent by the client. If any of these parameters are included in the request, they will be assigned to the corresponding variables

    await updateDailyClassSchedule(selectedDate);

    try{
        const schedule = await dailyClassSchedule.findOne({ _id: selectedDate });
        const classIDs = schedule.classes.map(cls => cls.classId);

        // Call the getDetialsForTimeTable function with the extracted parameters
        const detDetails = await classFunctions.getDetialsForTimeTable({
            classIDs: classIDs,
            grade: grade,
            subject: subject,
            teacher: teacher
        });

        const enrichedFilter = detDetails.map(cls => {
            const scheduleClass = schedule.classes.find(schClass => schClass.classId === cls._id);
            return {
                ...cls,
                startTime: scheduleClass.startTime,
                endTime: scheduleClass.endTime
            };
        });

        enrichedFilter.sort((a, b) => {
            const [aHour, aMinute] = a.startTime.split(":").map(Number);
            const [bHour, bMinute] = b.startTime.split(":").map(Number);

            if (aHour !== bHour) {
                return aHour - bHour;
            } else {
                return aMinute - bMinute;
            }
        });

        res.json(enrichedFilter);

    } catch (error) {
        res.status(500).json({ message: "Error updating query based on the user's selected criteria ", error });
    }
}

const getTodayClassesWithDetails = async (req, res) => {
    try {
        const today = "2024-10-24";

        //const today = new Date().toISOString().split('T')[0];

        const todaySchedule = await dailyClassSchedule.findOne({ _id: today });

        if (!todaySchedule) {
            return [];
        }

        const classIds = todaySchedule.classes.map(c => c.classId);

        const classDetails = await Classes.find({ _id: { $in: classIds } });

        const result = await Promise.all(
            todaySchedule.classes.map(async (classItem) => {
                const classDetail = classDetails.find(cd => cd._id === classItem.classId);
        
                const teacherName = await userFunctions.getNameFromTeacherIdforBackend(classDetail.teacherid);
        
                return {
                    grade: classDetail.grade,
                    subject: classDetail.subject,
                    medium: classDetail.medium,
                    teacher: teacherName,
                    time: classItem.startTime
                }
            })
        );

        result.sort((a, b) => {
            const [aHour, aMinute] = a.time.split(":").map(Number);
            const [bHour, bMinute] = b.time.split(":").map(Number);

            if (aHour !== bHour) {
                return aHour - bHour;
            } else {
                return aMinute - bMinute;
            }
        });

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = { 
    updateDailyClassSchedule,
    timetablehandlerfilter,
    getTodayClassesWithDetails
}