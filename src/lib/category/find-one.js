const { Category } = require('../../model');
const { notFound } = require('../../utils/error');

const findOneById = async (id) => {
    const category = await Category.findById(id);

    if (!category) throw notFound('Category not found');

    return category;
};

module.exports = findOneById;
