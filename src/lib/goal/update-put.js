const findOneById = require('./find-single');

const updatePut = async ({ id, title, description, targetAmount, targetDate }) => {
    const goal = await findOneById(id);

    goal.title = title || goal.title;
    goal.description = description || goal.description;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.targetDate = targetDate || goal.targetDate;

    const newGoal = await goal.save();
    return { ...newGoal._doc, id: newGoal._id };
};

module.exports = updatePut;
