const { badRequest } = require('../../utils/error');
const { compareHash } = require('../../utils/hashing');
const { findUserByEmail } = require('../user');

const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user) throw badRequest('Invalid email or password');

    const isPasswordMatched = await compareHash(password, user.password);

    if (!isPasswordMatched) throw badRequest('Invalid email or password');

    return user;
};

module.exports = login;
