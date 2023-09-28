const goalService = require('../../../../lib/goal');

const updateProgress = async (req, res, next) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const goal = await goalService.updateProgress(id, amount);

        const response = {
            code: 200,
            status: 'success',
            data: goal,
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

module.exports = updateProgress;
