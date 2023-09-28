const _default = require('../../config/default');
const { Transaction } = require('../../model');

const findAll = async ({
    page = _default.page,
    limit = _default.limit,
    order = _default.order,
    sort = _default.sort,
    search = _default.search,
    userId,
    expand,
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

    const expandArr = expand ? expand.split(',') : [];

    const options = {
        skip,
        limit,
        sort: { [sort]: order === 'desc' ? -1 : 1 },
        populate: expandArr,
    };

    const transactions = await Transaction.find(query, {}, options);

    const totalItems = await Transaction.countDocuments(query);

    const filteredTransactions = transactions.map((transaction) => ({
        ...transaction._doc,
        id: transaction.id,
        category: transaction.category,
    }));

    return {
        data: filteredTransactions,
        page,
        limit,
        totalItems,
    };
};

module.exports = findAll;
