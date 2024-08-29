const express = require('express');
const cors = require('cors');
const getdates = require('./userFunctions/dailyClassSchedule');
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

app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/class', classRouter);

const date = '2024-08-28';
getdates.updateDailyClassSchedule(date);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

