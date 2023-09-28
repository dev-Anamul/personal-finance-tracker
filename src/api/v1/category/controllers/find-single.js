const categoryService = require('../../../../lib/category');

const findSingle = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await categoryService.findOne(id);

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

module.exports = findSingle;
