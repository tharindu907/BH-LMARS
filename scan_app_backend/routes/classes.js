const router = require('express').Router();
const controller = require('../userFunctions/classes')

router.post('/add', controller.addClass);
router.get('/get/classcount', controller.countClasses);

// New route to get all classes
router.get('/getAllClasses', controller.getAllClasses);

module.exports = router;