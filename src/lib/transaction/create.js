const { Transaction } = require('../../model');

const create = async ({ title, userId, amount, type, description, date, categoryId }) => {
    const transaction = new Transaction({
        title,
        date,
        categoryId,
        userId,
        amount,
        type,
        description,
    });
    return transaction.save();
};

module.exports = create;
