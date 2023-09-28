const { Goal } = require('../../model');

const createGoal = async ({
    title,
    description,
    targetAmount,
    currentProgress,
    targetDate,
    userId,
}) => {
    const goal = new Goal({
        title,
        description,
        targetAmount,
        currentProgress,
        targetDate,
        userId,
    });

    const createdGoal = await goal.save();

    return { ...createdGoal._doc, id: createdGoal.id };
};

module.exports = createGoal;
