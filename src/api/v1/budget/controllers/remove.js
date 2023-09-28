const { removeOneById } = require('../../../../lib/budget');

const removeOne = async (req, res, next) => {
    const { id } = req.params;

    try {
        await removeOneById(id);

        const response = {
            code: 204,
            status: 'success',
            data: null,
        };

        return res.status(204).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = removeOne;
