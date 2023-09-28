const { generateTransaction } = require('../../../../../seed');
const { Transaction } = require('../../../../model');

const bulkAdd = async (req, res, next) => {
    try {
        const transactions = [];

        for (let i = 0; i < 500; i += 1) {
            const newTransaction = Transaction(generateTransaction());
            transactions.push(newTransaction);
        }

        const newTransactions = await Transaction.insertMany(transactions);

        return res.status(201).json({
            code: 201,
            status: 'success',
            data: newTransactions,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = bulkAdd;
