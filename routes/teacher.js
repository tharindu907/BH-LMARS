const router = require('express').Router();
const controller = require('../userFunctions/teacher')

router.get('/', controller.getTeacher);
router.post('/add', controller.addTeacher);

module.exports = router;