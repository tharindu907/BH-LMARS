const router = require('express').Router();
const controller = require('../userFunctions/user')

router.get('/get/admin', controller.getAdmins);
router.post('/add', controller.addUser);
router.get('/get/teachercount', controller.countTeachers)

module.exports = router;