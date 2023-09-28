const { Category } = require('../../model');

const createCategory = async ({ title, description, userId }) => {
    const category = new Category({
        title,
        description,
        userId,
    });

    return category.save();
};

module.exports = createCategory;
