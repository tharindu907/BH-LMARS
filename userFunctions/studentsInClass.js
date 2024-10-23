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
    const { searchClass, searchStudent, year } = req.body;

    try {
        const isClassExists = await studentsInClass.findOne({ _id: `${searchClass}.${year}`});

        if (!isClassExists) {
            return res.json({ isClassExist: false, isStudentEnrolled: false, paymentsInfo: null });
        }

        const isStudentEnrolled = isClassExists.studentsRegistered.find(
            stu => stu.studentId === searchStudent
        );

        if (!isStudentEnrolled) {
            return res.json({ isClassExist: true, isStudentEnrolled: false, paymentsInfo: null });
        }

        const paymentsInfo = isStudentEnrolled.payments.map(payment => ({
            month: payment.month,
            paymentStatus: payment.paymentStatus,
            paymentDate: payment.paymentDate
        }));

        res.json({ isClassExist: true, isStudentEnrolled: true, paymentsInfo: paymentsInfo });
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

const checkAllStudentPayments = async(req, res) => {
    
    try {
        const {searchId, year, monthnumber} = req.body;

        const classRecord = await studentsInClass.findOne({ _id: `${searchId}.${year}` });

        if (!classRecord) {
            return res.status(500).json({ message: `Class with ID ${searchId} for year ${year} not found.` });
        }

        const result = classRecord.studentsRegistered.map(student => {
            const paymentRecord = student.payments.find(payment => payment.month === `${year}-${monthnumber}`);
            
            return {
                studentId: student.studentId,
                paymentStatus: paymentRecord ? paymentRecord.paymentStatus : false,
                paymentDate: paymentRecord ? paymentRecord.paymentDate : null
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getClassesForStudent,
    isStudentEnrolledToClass,
    addMonthlyPayment,
    isPaymentDone,
    getStudentsByClassId,
    addNewStudenttoClass,
    checkAllStudentPayments
}