/* eslint-disable import/no-unresolved */
const { Budget } = require('../../model');

const create = async ({ title, type, description, date, amount, categoryId, userId }) => {
    const budget = new Budget({
        title,
        type,
        description,
        date,
        amount,
        categoryId,
        userId,
    });

    return budget.save();
};

module.exports = create;
