const { Category } = require('../../model');

const hasCategory = async (id) => {
    const category = await Category.findById(id);
    return !!category;
};

module.exports = {
    hasCategory,
};
