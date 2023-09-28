const findOneById = require('./find-one');

const remove = async (id) => {
    const category = await findOneById(id);

    return category.deleteOne();
};

module.exports = remove;
