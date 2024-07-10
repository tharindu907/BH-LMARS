const router = require('express').Router();
const controller = require('../userFunctions/student')

router.get('/', controller.getStudent);
router.post('/add', controller.addStudent);

module.exports = router;