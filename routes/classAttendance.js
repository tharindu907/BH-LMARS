const router = require('express').Router();
const controller = require('../userFunctions/classAttendance')

router.post('/get/studentAttendance', controller.getStudentAttendance);

module.exports = router;