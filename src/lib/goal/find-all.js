const _default = require('../../config/default');
const { Goal } = require('../../model');

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

    const goals = await Goal.find(query, {}, options);

    const totalItems = await Goal.countDocuments(query);

    const filteredGoals = goals.map((goal) => ({
        ...goal._doc,
        id: goal.id,
    }));

    return {
        data: filteredGoals,
        page,
        limit,
        totalItems,
    };
};

module.exports = findAll;
