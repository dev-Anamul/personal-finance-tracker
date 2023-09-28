const { Budget } = require('../../model');
const { badRequest } = require('../../utils/error');

const findOneById = async (id) => {
    const budget = await Budget.findById(id).populate('category');

    if (!budget) throw badRequest('Budget not found');

    return budget;
};

module.exports = findOneById;
