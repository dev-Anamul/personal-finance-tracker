const budgetService = require('../../../../lib/budget');

const findOne = async (req, res, next) => {
    const { id } = req.params;

    try {
        const budget = await budgetService.findOneById(id);

        const response = {
            code: 200,
            status: 'success',
            data: budget,
            links: {
                self: `${req.baseUrl}/${budget.id}`,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = findOne;
