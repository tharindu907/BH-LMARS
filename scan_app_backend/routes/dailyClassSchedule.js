const router = require('express').Router();
const controller = require('../userFunctions/dailyClassSchedule')

router.get('/get/filterfortimetable', controller.timetablehandlerfilter);

module.exports = router;