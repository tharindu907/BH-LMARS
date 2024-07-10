const router = require('express').Router();
const controller = require('../userFunctions/admin')

router.post('/add', controller.addAdmin);

module.exports = router;