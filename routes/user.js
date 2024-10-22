const router = require('express').Router();
const controller = require('../userFunctions/user')

router.get('/get/admin', controller.getAdmins);
router.post('/add', controller.addUser);
router.get('/get/teachercount', controller.countTeachers)
router.get('/get/nameFromTeacherId', controller.getNameFromTeacherIdforFrontend)
router.get('/get/teachernames', controller.getTeacherNames);
router.get('/get/userdetails/:id', controller.getUser);
router.get('/get/staffdetails', controller.getStaffDeatils);
router.get('/get/teacherdetails', controller.getTeacherDetails);
router.put('/update/userdetails/:id', controller.updateUserDetails);

module.exports = router;