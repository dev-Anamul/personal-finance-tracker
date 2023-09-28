const categoryService = require('../../../../lib/category');

const createCategory = async (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const category = await categoryService.create({
            title,
            description,
            userId,
        });

        const response = {
            code: 201,
            status: 'success',
            data: {
                category,
            },
            links: {
                self: `/api/v1/categories/${category.id}`,
                all_categories: '/api/v1/categories',
            },
        };

        return res.status(201).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = createCategory;
