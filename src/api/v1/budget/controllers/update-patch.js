const budgetService = require('../../../../lib/budget');

const updateBudget = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, amount, categoryId, type, date } = req.body;

    try {
        const budget = await budgetService.updateOne({
            id,
            title,
            description,
            amount,
            categoryId,
            type,
            date,
        });

        const response = {
            code: 200,
            status: 'success',
            data: budget,
            links: {
                self: `${req.baseUrl}/${budget.id}`,
                all_budgets: `${req.baseUrl}`,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = updateBudget;
