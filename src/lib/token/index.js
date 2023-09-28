const jwt = require('jsonwebtoken');
const { serverError } = require('../../utils/error');

const generateToken = (
    payload,
    algorithm = 'HS256',
    secret = process.env.JWT_SECRET,
    expiresIn = '24h'
) => {
    try {
        return jwt.sign(payload, secret, { algorithm, expiresIn });
    } catch (error) {
        console.log('[JWT] Error generating token', error);
        throw serverError();
    }
};

const decodeToken = (token, algorithm = 'HS256') => {
    try {
        return jwt.decode(token, { algorithms: [algorithm] });
    } catch (error) {
        console.log('[JWT] Error decoding token', error);
        throw serverError();
    }
};

const verifyToken = (token, secret = process.env.JWT_SECRET, algorithm = 'HS256') => {
    try {
        return jwt.verify(token, secret, { algorithms: [algorithm] });
    } catch (error) {
        console.log('[JWT] Error verifying token', error);
        throw serverError();
    }
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
};
