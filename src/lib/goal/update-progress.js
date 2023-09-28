const { Goal } = require('../../model');

const updateProgress = async (id, amount) => {
    const goal = await Goal.findById(id);

    goal.currentProgress += amount;

    return goal.save();
};

module.exports = updateProgress;
