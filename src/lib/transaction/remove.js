const findOneById = require('./find-one');

const removeOneById = async (id) => {
    const transaction = await findOneById(id);

    return transaction.deleteOne();
};

module.exports = removeOneById;
