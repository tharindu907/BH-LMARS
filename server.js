const express = require('express');
const cors = require('cors');
const func = require('./userFunctions/dailyClassSchedule');
const func1 = require('./userFunctions/studentsInClass');
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
const { getDetialsForTimeTable } = require('./userFunctions/classes');
const { getTeacherIdFromName } = require('./userFunctions/user');

app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/class', classRouter);

// func.updateDailyClassSchedule("2024-09-02", { classId: "EENG108", startTime: "0700", endTime: "1000"} );
// func1.addStudentToClass("SSCI103", "ASIRI");
// func1.getClassesForStudent("ASIRI");
// func1.isStudentEnrolledToClass("SSCI103", "ASIRI");
// func1.addMonthlyPayment("SSCI103", "ASIRI", "2024-10")

// getDetialsForTimeTable({classIDs:['SMAT101','SSIN102',"EHIS105"]});

// getTeacherIdFromName("Prabath Sampath");

// func.timetablehandler("2024-09-02", null, null, "Prabath Sampath");

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

