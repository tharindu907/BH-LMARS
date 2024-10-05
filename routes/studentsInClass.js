const router = require('express').Router();
const controller = require('../userFunctions/studentsInClass')

router.post('/get/isStudentEnrolledToClass', controller.isStudentEnrolledToClass);

module.exports = router;