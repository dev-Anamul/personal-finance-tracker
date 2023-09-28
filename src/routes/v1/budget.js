/* eslint-disable import/no-unresolved */
const router = require('express').Router();
const ownership = require('../../middleware/ownership');
const { Budget } = require('../../model');
const budgetController = require('../../api/v1/budget');

router.route('/').get(budgetController.findAll).post(budgetController.createBudget);

router
    .route('/:id')
    .get(ownership(Budget), budgetController.findOneById)
    .delete(ownership(Budget), budgetController.removeOneById)
    .patch(ownership(Budget), budgetController.updateOne);

module.exports = router;
