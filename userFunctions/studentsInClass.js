const studentsInClass = require('../models/studentsInClass.model');
const studentcontroller = require('../userFunctions/student');

async function getClassesForStudent(studentID) { // this will return the classes to which the student has registered
    try {
        const classes = await studentsInClass.find({
            'studentsRegistered.studentId': studentID
        }, '_id'); // Retrieve only the class ID

        if (classes.length === 0) {
            console.log(`No classes found for student ID: ${studentID}`);
            return [];
        }
        console.table(classes.map(classItem => classItem._id));
        return classes.map(classItem => classItem._id);
    } catch (error) {
        console.error(`Error fetching classes for student ID ${studentID}:`, error);
        throw error;
    }
};

const isStudentEnrolledToClass = async (req, res) => {
    const { classId, student, year } = req.body;

    try {
        const isClassExists = await studentsInClass.findOne({ _id: `${classId}.${year}`});

        if (!isClassExists) {
            return res.json({ isStudentEnrolled: false, paymentsInfo: null });
        }

        const isStudentEnrolled = isClassExists.studentsRegistered.find(
            stu => stu.studentId === student.studentid
        );

        if (!isStudentEnrolled) {
            return res.json({ isStudentEnrolled: false, paymentsInfo: null });
        }

        const paymentsInfo = isStudentEnrolled.payments.map(payment => ({
            month: payment.month,
            paymentStatus: payment.paymentStatus,
            paymentDate: payment.paymentDate
        }));

        res.json({ isStudentEnrolled: true, paymentsInfo: paymentsInfo });
    } catch (err) {
        console.error("Error checking student enrollment:", err);
    }
}

async function addMonthlyPayment(classID, studentID, month) { // month - "2024-10"
    try {
        // First, check if the payment for the given month has already been done
        const paymentDone = await isPaymentDone(classID, studentID, month);
        
        if (!paymentDone) {
            // If payment does not exist, proceed to add it
            await studentsInClass.updateOne(
                { 
                    _id: classID,
                    'studentsRegistered.studentId': studentID 
                },
                { 
                    $push: { 
                        'studentsRegistered.$.payments': { paymentId: month } 
                    } 
                }
            );
            console.log(`Payment status for ${month} added successfully for student ${studentID}.`);
        } else {
            console.log(`Payment for ${month} has already been done for student ${studentID}.`);
        }
    } catch (error) {
        console.error('Error adding monthly payment status:', error);
    }  
}

async function isPaymentDone(classID, studentID, paymentMonth) {
    try {
        const classData = await studentsInClass.findOne({
            _id: classID,
            'studentsRegistered.studentId': studentID,
            'studentsRegistered.payments.paymentId': paymentMonth // "2024-10"
        });

        // If classData is null, the payment is not done, hence false returned
        return classData !== null;
    } catch (error) {
        console.error('Error checking payment status:', error);
        throw error; // Handle the error as needed
    }
}

async function addStudentToClass(classId, studentId) {
    try {
        const currentDate = new Date();

        // Attempt to find the class document
        const classDocument = await studentsInClass.findById(classId);

        if (!classDocument) {
            // If the class does not exist, create a new class document
            await studentsInClass.create({
                _id: classId,
                studentsRegistered: [{
                    studentId: studentId,
                    registeredDate: currentDate,
                    payments: []
                }]
            });

            console.log(`Class ${classId} created and student ${studentId} registered as the first student.`);
        } else {
            // Check if the student is already registered
            const isStudentRegistered = classDocument.studentsRegistered.find(
                student => student.studentId === studentId
            );


            if (isStudentRegistered) {
                console.log(`Student ${studentId} is already registered to class ${classId}.`);
                return; // Exit the function since the student is already registered
            }
            // If the student is not registered, proceed to add the
            await studentsInClass.findOneAndUpdate(
                { _id: classId },
                {
                    $push: {
                        studentsRegistered: {
                            studentId: studentId,
                            registeredDate: currentDate,
                            payments: []
                        }
                    }
                }
            );

            console.log(`Student ${studentId} successfully registered to class ${classId}.`);
        }
    } catch (error) {
        console.error('Error registering student to class:', error);
    }
}

const getStudentsByClassId = async (req, res) => {
    try {
        const { searchId, year } = req.body;
        
        const classData = await studentsInClass.findOne({ _id: `${searchId}.${year}` });

        if (!classData) {
            return res.json(null);
        }

        // Map through the studentsRegistered to fetch student names
        const studentsWithNames = await Promise.all(classData.studentsRegistered.map(async (student) => {
            const name = await studentcontroller.getStudentNameFromStudentID(student.studentId);
            return {
                studentId: student.studentId,
                name // Append the name to the student data
            };
        }));

        // Return the updated list with names
        res.json(studentsWithNames);

    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

const addNewStudenttoClass = async (req, res) => {
    try {
        const { searchId, year, newStudentId} = req.body;
    
        const result = await studentsInClass.findOneAndUpdate(
            { _id: `${searchId}.${year}` }, 
            { $push: { studentsRegistered: {
                studentId: newStudentId,
                registeredDate: new Date(),
                payments: []
            }}},
            { upsert: true, new: true } // If the document doesn't exist, create it (upsert)
        );
  
        res.json(result);
    } catch (error) {
        console.error('Error adding new student:', error);
        throw error;
    }
  };

module.exports = {
    getClassesForStudent,
    isStudentEnrolledToClass,
    addMonthlyPayment,
    isPaymentDone,
    addStudentToClass,
    getStudentsByClassId,
    addNewStudenttoClass
}