const { badRequest } = require('../../utils/error');
const { updateUser, findUserById } = require('../user');

const updateProfile = async (id, payload = {}) => {
    const { email } = payload;

    const user = await findUserById(id);

    if (!user) throw badRequest('User not found');

    if (email === user.email) throw badRequest('Email already exists');

    return updateUser(id, payload);
};

module.exports = updateProfile;
