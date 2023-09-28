const router = require('express').Router();

const { controller: transactionController } = require('../../api/v1/transactions');
const ownership = require('../../middleware/ownership');
const { Transaction } = require('../../model');

router.get('/expense-trends', transactionController.expenseTrends);
router.get('/income-trends', transactionController.incomeTrends);
router.get('/stats', transactionController.transactionStats);

router.route('/').get(transactionController.findAll).post(transactionController.create);

router
    .route('/:id')
    .get(ownership(Transaction), transactionController.findOne)
    .put(ownership(Transaction), transactionController.updatedTransactions)
    .delete(ownership(Transaction), transactionController.removeTransaction);

// export router
module.exports = router;
