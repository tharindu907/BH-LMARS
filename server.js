const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
dbConnect();

require('dotenv').config();

const app = express();
const port = process.env.PORT; // process.env provide access to assigned enviroment variable 

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
const studentRouter = require('./routes/student');
const classRouter = require('./routes/classes')
const loginRouter = require('./login');
const dailyClassScheduleRouter = require('./routes/dailyClassSchedule');
const studentsInClassRouter = require('./routes/studentsInClass');
const classAttendanceRouter = require('./routes/classAttendance');
const { getTodayClassesWithDetails } = require('./userFunctions/dailyClassSchedule');

app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/class', classRouter);
app.use('/dailyClassSchedule', dailyClassScheduleRouter)
app.use('/studentsInClass', studentsInClassRouter)
app.use('/classAttendance', classAttendanceRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

