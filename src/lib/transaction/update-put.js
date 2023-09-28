const findOneById = require('./find-one');

const updateOne = async ({ title, description, type, amount, date, categoryId, id }) => {
    const transaction = await findOneById(id);

    transaction.title = title || transaction.title;
    transaction.description = description || transaction.description;
    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.date = date || transaction.date;
    transaction.categoryId = categoryId || transaction.categoryId;

    return transaction.save();
};

module.exports = updateOne;
