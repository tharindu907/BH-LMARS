const router = require('express').Router();
const controller = require('../userFunctions/classes')

router.post('/add', controller.addClass);

router.route('/').get((req, res) => {
    Classes.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;