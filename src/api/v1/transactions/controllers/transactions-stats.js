/* eslint-disable camelcase */
const transactionService = require('../../../../lib/transaction');

const transactionStats = async (req, res, next) => {
    const { start_date = '', end_date = '' } = req.query || '';
    const userId = req.user._id;
    try {
        const stats = await transactionService.transactionStats({
            userId,
            endDate: end_date,
            startDate: start_date,
        });

        return res.status(200).json({
            code: 200,
            status: 'success',
            data: stats,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = transactionStats;
