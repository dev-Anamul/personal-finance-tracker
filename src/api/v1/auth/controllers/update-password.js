const { badRequest } = require('../../../../utils/error');
const { compareHash, generateHash } = require('../../../../utils/hashing');
const matchPassword = require('../../../../utils/matchPassword');
const authServices = require('../../../../lib/auth');

const updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body || {};
    const user = req.user || {};

    try {
        // match new password and confirm password
        const isPasswordMatched = matchPassword(newPassword, confirmPassword);
        if (!isPasswordMatched) throw badRequest('New password and confirm password mismatch');

        // match current password
        const isCurrentPasswordMatched = await compareHash(currentPassword, user.password);
        if (!isCurrentPasswordMatched) throw badRequest('Invalid current password');

        // hash new password
        const hashedPassword = await generateHash(newPassword);

        // update user password

        await authServices.updatePassword(user.id, hashedPassword);

        // generate response
        const response = {
            code: 200,
            message: 'Password updated successfully',
            links: {
                self: req.originalUrl,
                login: '/api/v1/auth/login',
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = updatePassword;
