const categoryService = require('../../../../lib/category');

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        await categoryService.remove(id);

        const response = {
            code: 204,
            status: 'success',
            message: 'Category deleted successfully',
        };

        return res.status(204).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = remove;
