const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const func = require('./userFunctions/dailyClassSchedule');
const func1 = require('./userFunctions/studentsInClass');
const func2 = require('./userFunctions/classAttendance');

const User = require('./models/user.model');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
dbConnect();

const app = express();
const port = process.env.PORT || 5000; // Provide a default port if not specified

// Middleware setup
app.use(cors());
app.use(express.json()); // For parsing application/json

// Importing routers
const userRouter = require('./routes/user');
const studentRouter = require('./routes/student');
const classRouter = require('./routes/classes');
const loginRouter = require('./login');
const dailyClassScheduleRouter = require('./routes/dailyClassSchedule');
const classAttendanceRouter = require('./routes/classAttendance');

// Define routes
app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/class', classRouter);
app.use('/dailyClassSchedule', dailyClassScheduleRouter);
app.use('/classAttendance', classAttendanceRouter);

// Sample function calls (uncomment as needed)
// func.updateDailyClassSchedule("2024-09-02", { classId: "EENG108", startTime: "0700", endTime: "1000" });
// func1.addStudentToClass("SSCI103", "ASIRI");
// func1.getClassesForStudent("ASIRI");
// func1.isStudentEnrolledToClass("SSCI103", "ASIRI");
// func1.addMonthlyPayment("SSCI103", "ASIRI", "2024-10");
// getDetialsForTimeTable({ classIDs: ['SMAT101', 'SSIN102', "EHIS105"] });
// getTeacherIdFromName("Prabath Sampath");
// func.timetablehandlerfilter("2024-09-03", null, null, null);

app.get('/', (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server Listening on Port http://192.168.8.100:${port}`);
});

