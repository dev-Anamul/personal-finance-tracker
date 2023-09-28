const transactionService = require('../../../../lib/transaction');

const removeTransaction = async (req, res, next) => {
    const { id } = req.params;

    try {
        await transactionService.removeOneById(id);

        const response = {
            code: 204,
            status: 'success',
            message: 'transaction removed',
        };

        return res.status(204).json(response);
    } catch (error) {
        return next(error);
    }
};
module.exports = removeTransaction;
