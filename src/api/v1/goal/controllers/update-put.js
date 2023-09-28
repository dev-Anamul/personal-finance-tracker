const goalService = require('../../../../lib/goal');

const updatePut = async (req, res, next) => {
    try {
        const { id } = req.params || {};
        const { title, description, targetAmount, targetDate } = req.body || {};

        const data = await goalService.update({
            id,
            title,
            description,
            targetAmount,
            targetDate,
        });

        const response = {
            code: 200,
            status: 'success',
            data,
            links: {
                self: `${req.baseUrl}${req.path}`,
                update: `${req.baseUrl}${req.path}`,
                delete: `${req.baseUrl}${req.path}`,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = updatePut;
