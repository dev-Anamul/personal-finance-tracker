const transactionService = require('../../../../lib/transaction');

const updateTransaction = async (req, res, next) => {
    const { id } = req.params;
    const { amount, categoryId, date, description, title, type } = req.body || {};

    try {
        const updatedTransactions = await transactionService.updateOneById({
            id,
            amount,
            categoryId,
            date,
            description,
            title,
            type,
        });

        return res.status(200).json({
            code: 200,
            status: 'success',
            data: updatedTransactions,
            links: {
                self: `${req.baseUrl}${req.path}`,
                get: `${req.baseUrl}${req.path}`,
                delete: `${req.baseUrl}${req.path}`,
            },
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = updateTransaction;
