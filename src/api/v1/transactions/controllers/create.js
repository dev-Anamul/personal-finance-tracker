const categoryService = require('../../../../lib/category');
const { badRequest } = require('../../../../utils/error');
const transactionService = require('../../../../lib/transaction');

const createTransaction = async (req, res, next) => {
    const { title, description, amount, date, type, categoryId } = req.body || {};
    const userId = req.user.id;

    try {
        const hasCategory = await categoryService.hasCategory(categoryId);
        if (!hasCategory) return next(badRequest("Category doesn't exist"));

        const transaction = await transactionService.create({
            title,
            description,
            amount,
            date,
            type,
            categoryId,
            userId,
        });

        const response = {
            code: 201,
            status: 'success',
            data: transaction,
            links: {
                self: `/api/v1/transactions/${transaction.id}`,
            },
        };

        return res.status(201).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = createTransaction;
