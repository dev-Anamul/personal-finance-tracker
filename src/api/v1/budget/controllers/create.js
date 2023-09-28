const { badRequest } = require('../../../../utils/error');
const { create } = require('../../../../lib/budget');
const { hasCategory } = require('../../../../lib/category');

const createBudget = async (req, res, next) => {
    const { title, type, description, date, amount, categoryId } = req.body || {};
    const userId = req.user._id;

    try {
        const hasCat = await hasCategory(categoryId);

        if (!hasCat) return next(badRequest("Category doesn't exist"));

        const newBudget = await create({
            title,
            type,
            description,
            date,
            amount,
            categoryId,
            userId,
        });

        return res.status(201).json({
            code: 201,
            status: 'success',
            data: newBudget,
            links: {
                self: `${req.baseUrl}${req.path}`,
                get: `${req.baseUrl}${req.path}`,
                delete: `${req.baseUrl}${req.path}`,
            },
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = createBudget;
