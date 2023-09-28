const { Transaction } = require('../../model');
const { notFound } = require('../../utils/error');

const findOneById = async (id) => {
    const transaction = await Transaction.findById(id).populate('category');

    if (!transaction) throw notFound('Transaction not found');

    return transaction;
};

module.exports = findOneById;
