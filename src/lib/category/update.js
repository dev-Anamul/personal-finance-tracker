/* eslint-disable no-underscore-dangle */
const findOneById = require('./find-one');

const update = async ({ id, title = '', description = '' }) => {
    const category = await findOneById(id);

    category.title = title || category.title;
    category.description = description || category.description;

    const updatedCat = await category.save();

    return { ...updatedCat._doc, id: updatedCat.id };
};

module.exports = update;
