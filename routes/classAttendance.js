const router = require('express').Router();
const controller = require('../userFunctions/classAttendance')

router.post('/get/studentAttendance', controller.getStudentAttendance);
router.post('/add/attendance', controller.addAttendee)

module.exports = router;