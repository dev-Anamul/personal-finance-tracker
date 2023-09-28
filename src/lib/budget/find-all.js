const { Budget } = require('../../model');
const _default = require('../../config/default');

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
        populate: 'category',
    };

    const budgets = await Budget.find(query, {}, options);

    const totalItems = await Budget.countDocuments(query);

    const filteredBudgets = budgets.map((budget) => ({
        ...budget._doc,
        id: budget.id,
        category: budget.category,
    }));

    return {
        data: filteredBudgets,
        page,
        limit,
        totalItems,
    };
};

module.exports = findAll;
