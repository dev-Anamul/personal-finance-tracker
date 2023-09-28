const router = require('express').Router();
const categoryController = require('../../api/v1/category');
const ownership = require('../../middleware/ownership');
const { Category } = require('../../model');

router.route('/').get(categoryController.getCategories).post(categoryController.createCategory);
router
    .route('/:id')
    .get(ownership(Category), categoryController.findSingle)
    .put(ownership(Category), categoryController.updatePut)
    .delete(ownership(Category), categoryController.remove);

// router.get('categories/:id/transactions', categoryController.getCategoryTransactions);

module.exports = router;
