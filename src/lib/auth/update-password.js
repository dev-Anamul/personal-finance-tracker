const { badRequest } = require('../../utils/error');
const { findUserById } = require('../user');

const updatePassword = async (id, password) => {
    const user = await findUserById(id);

    if (!user) throw badRequest('User not found');

    user.password = password;

    return user.save();
};

module.exports = updatePassword;
