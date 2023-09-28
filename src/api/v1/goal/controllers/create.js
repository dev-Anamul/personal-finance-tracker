const goalService = require('../../../../lib/goal');

const create = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { title, description, targetAmount, currentProgress, targetDate } = req.body;

        const data = await goalService.create({
            title,
            userId: id,
            description,
            targetAmount,
            currentProgress,
            targetDate,
        });

        const response = {
            code: 201,
            status: 'success',
            message: 'Goal created successfully',
            data,
            links: {
                self: `${req.baseUrl}${data.id}`,
                find: `${req.baseUrl}`,
            },
        };

        return res.status(201).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = create;
