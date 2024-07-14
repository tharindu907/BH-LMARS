const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT; // process.env provide access to assigned enviroment variable 

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection successful");
})

const studentRouter = require('./routes/student');
const classesRouter = require('./routes/classes');
const teacherRouter = require('./routes/teacher');
const adminRouter = require('./routes/admin');
const loginRouter = require('./login');

app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/classes', classesRouter);
app.use('/teacher', teacherRouter);
app.use('/admin', adminRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

