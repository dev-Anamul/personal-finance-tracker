const goalService = require('../../../../lib/goal');

const removeGoal = async (req, res, next) => {
    try {
        const { id } = req.params || {};

        await goalService.remove(id);

        const response = {
            code: 204,
            status: 'success',
            message: 'Goal deleted successfully',
        };

        return res.status(204).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = removeGoal;
