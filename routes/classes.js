const router = require('express').Router();
const controller = require('../userFunctions/classes')

router.post('/add', controller.addClass);
router.get('/get/classcount', controller.countClasses);
router.get('/get/filterfortimetablehandler', controller.timetablehandlerfilter);

module.exports = router;