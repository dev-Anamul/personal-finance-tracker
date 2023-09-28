/* eslint-disable no-underscore-dangle */
const _default = require('../../config/default');
const { Category } = require('../../model');

const findAll = async ({
    page = _default.page,
    limit = _default.limit,
    order = _default.order,
    sort = _default.sort,
    search = _default.search,
    userId,
}) => {
    const skip = (page - 1) * limit;

    const query = {
        $and: [
            { userId },
            {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
            },
        ],
    };

    const options = {
        skip,
        limit,
        sort: { [sort]: order === 'desc' ? -1 : 1 },
    };
    // return this.find(query, {}, options);

    const categories = await Category.find(query, {}, options);

    const totalItems = await Category.countDocuments(query);

    const filteredCategories = categories.map((category) => ({
        ...category._doc,
        id: category.id,
    }));

    return {
        data: filteredCategories,
        page,
        limit,
        totalItems,
    };
};

module.exports = findAll;
