const { findTrend } = require('../../../../lib/transaction');

/* eslint-disable camelcase */
const incomeTrends = async (req, res, next) => {
    const { start_date = '', end_date = '', frequency = '' } = req.query;
    const userId = req.user._id;
    try {
        const transactionTrends = await findTrend({
            type: 'income',
            startDate: start_date,
            endDate: end_date,
            frequency,
            userId,
        });

        return res.status(200).json({
            code: 200,
            status: 'success',
            data: transactionTrends,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = incomeTrends;
