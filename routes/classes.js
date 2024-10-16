const router = require('express').Router();
const controller = require('../userFunctions/classes')

router.post('/add', controller.addClass);
router.get('/get/classcount', controller.countClasses);
router.get('/get/subjectnamesforallclasses', controller.getSubjectNamesOfAllClasses);
router.get('/get/classdetails/:id', controller.getClass);
router.get('/get/gradesforallclasses', controller.getGradesOfAllClasses);
router.post('/get/classIdbyDetails', controller.getClassByDetails) // eventhough it is a post and get function, post is better then get

module.exports = router;