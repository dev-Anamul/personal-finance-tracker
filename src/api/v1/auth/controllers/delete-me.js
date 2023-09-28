const userService = require('../../../../lib/user');
const { authenticationError } = require('../../../../utils/error');

const deleteMe = async (req, res, next) => {
    const user = req.user || {};

    try {
        if (!user) throw authenticationError();

        await userService.deleteUser(user?.id);

        return res.status(204).json({
            code: 204,
            message: 'Account deleted successfully',
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = deleteMe;
