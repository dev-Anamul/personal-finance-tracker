const authService = require('../../../../lib/auth');

const updateProfile = async (req, res, next) => {
    const { firstName, lastName, email } = req.body || {};
    const user = req.user || {};

    try {
        const updatedUser = await authService.updateProfile(user.id, {
            firstName,
            lastName,
            email,
        });

        const response = {
            code: 200,
            message: 'Profile updated successfully',
            data: {
                user: updatedUser,
            },
            links: {
                self: req.originalUrl,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = updateProfile;
