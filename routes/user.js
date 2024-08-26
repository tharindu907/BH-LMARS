const router = require('express').Router();
const controller = require('../userFunctions/user')

router.get('/get/admin', controller.getAdmins);
router.post('/add', controller.addUser);

module.exports = router;