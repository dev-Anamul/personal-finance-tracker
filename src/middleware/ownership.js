const { authorizationError } = require('../utils/error');

// eslint-disable-next-line prettier/prettier
const ownership = (model = {}) => async (req, res, next) => {
        const userId = req.user.id;
        const { id } = req.params;

        try {
            const data = await model.findOne({ _id: id, userId });

            if (!data) {
                return next(authorizationError());
            }

            return next();
        } catch (error) {
            return next(error);
        }
    };

module.exports = ownership;
