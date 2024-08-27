const router = require('express').Router();
const controller = require('../userFunctions/student')

router.get('/', controller.getStudent);
router.post('/add', controller.addStudent);
router.get('/get/malefemalecount', controller.countMaleandFemale);

module.exports = router;