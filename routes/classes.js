const router = require('express').Router();
const controller = require('../userFunctions/classes')

router.post('/add', controller.addClass);
router.get('/get/classcount', controller.countClasses);
router.get('/get/subjectnamesforallclasses', controller.getSubjectNamesOfAllClasses);
router.get('/get/classdetails/:id', controller.getClass);
router.get('/get/gradesforallclasses', controller.getGradesOfAllClasses);
router.get('/get/allclassesforteacher/:id', controller.getAllClassesForTeacher);
router.get('/get/classdetails', controller.getClassDetails);
router.put('/update/classdetails/:id', controller.updateClassDetails);
router.post('/get/classIdbyDetails', controller.getClassByDetails);

module.exports = router;