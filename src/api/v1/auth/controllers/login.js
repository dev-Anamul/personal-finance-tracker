const authService = require('../../../../lib/auth');
const { generateToken } = require('../../../../lib/token');

const login = async (req, res, next) => {
    const { email, password } = req.body || {};

    try {
        const user = await authService.login({ email, password });

        const payload = {
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        const accessToken = generateToken(payload);

        const response = {
            code: 200,
            message: 'Login successful',
            data: {
                access_token: accessToken,
            },
            links: {
                self: req.originalUrl,
                signup: '/api/v1/auth/signup',
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

module.exports = login;
