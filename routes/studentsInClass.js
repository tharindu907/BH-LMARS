const router = require('express').Router();
const controller = require('../userFunctions/studentsInClass')

router.post('/get/isStudentEnrolledToClass', controller.isStudentEnrolledToClass);
router.post('/get/studentsbyclassid', controller.getStudentsByClassId);
router.post('/post/newstudentstoclass', controller.addNewStudenttoClass);

module.exports = router;