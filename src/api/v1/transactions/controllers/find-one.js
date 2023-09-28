const transactionService = require('../../../../lib/transaction');

const findOne = async (req, res, next) => {
    const { id } = req.params;

    try {
        const transaction = await transactionService.findOneById(id);

        const response = {
            code: 200,
            status: 'success',
            data: transaction,
            links: {
                self: `/api/v1/transactions/${transaction.id}`,
            },
        };
        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = findOne;
