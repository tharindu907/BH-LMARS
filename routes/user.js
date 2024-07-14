const router = require('express').Router();
const controller = require('../userFunctions/user')

// router.get('/', controller.getUser);
router.post('/add', controller.addUser);

module.exports = router;