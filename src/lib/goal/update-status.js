const { Goal } = require('../../model');

const updateStatus = async (id, status) => {
    const goal = await Goal.findById(id);

    goal.status = status;

    return goal.save();
};

module.exports = updateStatus;
