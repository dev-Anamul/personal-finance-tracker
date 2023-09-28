/* eslint-disable no-underscore-dangle */
const { verifyToken } = require('../lib/token');
const { findUserById } = require('../lib/user');
const { authenticationError } = require('../utils/error');

const authenticate = async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        const decode = verifyToken(token);
        const user = await findUserById(decode.id);

        if (!user) return next(authenticationError());

        req.user = { ...user._doc, id: user.id };
        return next();
    } catch (error) {
        return next(authenticationError());
    }
};

module.exports = authenticate;
