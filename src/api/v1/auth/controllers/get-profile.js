const getProfile = async (req, res, next) => {
    const user = req.user || {};

    try {
        const response = {
            code: 200,
            message: 'Profile fetched successfully',
            data: {
                user,
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

module.exports = getProfile;
