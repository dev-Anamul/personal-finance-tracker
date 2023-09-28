const { dayOneYearAgo } = require('../../utils/date');
const { groupId, sortId, idFormate } = require('../../utils/aggregate');
const { Transaction } = require('../../model');

const findTrend = async ({ type = '', startDate = '', endDate = '', frequency = '', userId }) => {
    const aggregate = [
        {
            $match: {
                userId,
                type,
                date: {
                    $gte: startDate ? new Date(startDate) : dayOneYearAgo(),
                    $lte: endDate ? new Date(endDate) : new Date(),
                },
            },
        },
        {
            $group: {
                _id: groupId(frequency),
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 },
            },
        },
        {
            $sort: sortId(frequency),
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1,
                count: 1,
                frequency,
                ...idFormate(frequency),
            },
        },
    ];

    const transactionTrends = await Transaction.aggregate(aggregate);

    return transactionTrends;
};

module.exports = findTrend;
