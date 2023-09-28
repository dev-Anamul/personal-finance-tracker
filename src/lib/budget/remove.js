const findOneById = require('./find-one');

const removeOneById = async (id) => {
    const budget = await findOneById(id);

    return budget.deleteOne();
};

module.exports = removeOneById;
