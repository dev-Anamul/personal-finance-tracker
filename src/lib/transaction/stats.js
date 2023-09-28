const { Transaction } = require('../../model');
const { dayOneYearAgo } = require('../../utils/date');

const transactionStats = async ({ startDate = '', endDate = '', userId }) => {
    const aggregate = [
        {
            $match: {
                userId,
                date: {
                    $gte: startDate ? new Date(startDate) : dayOneYearAgo(),
                    $lte: endDate ? new Date(endDate) : new Date(),
                },
            },
        },
        {
            $group: {
                _id: '$type',
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                type: '$_id',
                totalAmount: 1,
                count: 1,
            },
        },
    ];

    const stats = await Transaction.aggregate(aggregate);

    return stats;
};

module.exports = transactionStats;
