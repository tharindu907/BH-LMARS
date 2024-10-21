const router = require('express').Router();
const controller = require('../userFunctions/classAttendance');

router.post('/post/addAttendee', controller.addAttendee);

module.exports = router;
