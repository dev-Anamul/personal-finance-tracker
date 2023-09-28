const categoryService = require('../../../../lib/category');

const updatePut = async (req, res, next) => {
    const { id } = req.params || {};
    const { title, description } = req.body || {};

    try {
        const category = await categoryService.update({ id, title, description });

        const response = {
            code: 200,
            status: 'success',
            message: 'category updated successfully',
            data: {
                ...category,
            },
            links: {
                self: `${req.baseUrl}${req.path}`,
                get: `${req.baseUrl}${req.path}`,
                delete: `${req.baseUrl}${req.path}`,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = updatePut;
