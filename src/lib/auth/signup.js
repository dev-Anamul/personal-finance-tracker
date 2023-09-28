const { badRequest } = require('../../utils/error');
const { generateHash } = require('../../utils/hashing');
const { hasUser, createUser } = require('../user');

// eslint-disable-next-line object-curly-newline
const signup = async ({ firstName, lastName, email, password }) => {
    const isUserExist = await hasUser(email);

    if (isUserExist) throw badRequest('User already exists');

    const hashPassword = await generateHash(password);

    const user = await createUser({ firstName, lastName, email, password: hashPassword });

    return user;
};

module.exports = signup;
