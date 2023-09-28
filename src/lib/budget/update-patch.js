const findOneById = require('./find-one');

const updateOne = async ({ id, title, description, amount, date, categoryId, type }) => {
    const budget = await findOneById(id);

    budget.title = title || budget.title;
    budget.description = description || budget.description;
    budget.type = type || budget.type;
    budget.amount = amount || budget.amount;
    budget.date = date || budget.date;
    budget.categoryId = categoryId || budget.categoryId;

    return budget.save();
};

module.exports = updateOne;
