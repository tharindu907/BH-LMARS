const router = require('express').Router();
const controller = require('../userFunctions/dailyClassSchedule')

router.get('/get/filterfortimetable', controller.timetablehandlerfilter);
router.get('/get/dailyclassdetails', controller.getTodayClassesWithDetails);

module.exports = router;