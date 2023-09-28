const authService = require('../../../../lib/auth');
const { generateToken } = require('../../../../lib/token');

const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body || {};

    try {
        const user = await authService.signup({
            firstName,
            lastName,
            email,
            password,
        });

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
            code: 201,
            message: 'Signup successful',
            data: {
                access_token: accessToken,
            },
            links: {
                self: req.originalUrl,
                login: '/api/v1/auth/login',
            },
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = signup;
