const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API Working',
        message: 'Welcome to test rest node'
    });
});

const personController = require('./personController');

router.route('/persons')
    .get(personController.index)
    .post(personController.new);

router.route('/persons/:person_id')
    .get(personController.view)
    .patch(personController.update)
    .post(personController.update)
    .delete(personController.delete);

module.exports = router;
