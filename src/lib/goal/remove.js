const findOneById = require('./find-single');

const remove = async (id) => {
    const goal = await findOneById(id);

    return goal.deleteOne();
};

module.exports = remove;
