const router = require('express').Router();
const controller = require('../userFunctions/classes')

router.post('/add', controller.addClass);
router.get('/get/classcount', controller.countClasses);

module.exports = router;