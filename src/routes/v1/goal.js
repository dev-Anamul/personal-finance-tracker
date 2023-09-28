const router = require('express').Router();
const { controller: goalController } = require('../../api/v1/goal');
const ownership = require('../../middleware/ownership');
const { Goal } = require('../../model');

router.patch('/:id/progress', ownership(Goal), goalController.updateProgress);
router.patch('/:id/status', ownership(Goal), goalController.updateStatus);

router.route('/').get(goalController.findAll).post(goalController.create);

router
    .route('/:id')
    .get(ownership(Goal), goalController.findOne)
    .put(ownership(Goal), goalController.update)
    .delete(ownership(Goal), goalController.remove);
module.exports = router;
