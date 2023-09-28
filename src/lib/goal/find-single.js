const { Goal } = require('../../model');
const { notFound } = require('../../utils/error');

const findOneById = async (id) => {
    const goal = await Goal.findById(id);

    if (!goal) throw notFound('Goal not found');

    return goal;
};

module.exports = findOneById;
