const { authorizationError } = require('../utils/error');

/* eslint-disable prettier/prettier */
const authorization = ([...roles]) => (req, res, next) => {
        const { role } = req.user;
        if (!roles.includes(role)) {
            return next(authorizationError());
        }
        return next();
    };

module.exports = authorization;
