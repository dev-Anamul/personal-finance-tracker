const { User } = require('../../model');
//  create user
const createUser = async ({ firstName, lastName, email, password }) => {
    const user = new User({
        firstName,
        lastName,
        email,
        password,
    });

    return user.save();
};

// find use by email
const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user || null;
};

//  check if user exists
const hasUser = async (email) => {
    const user = await User.findOne({ email });

    return !!user;
};

// find user by id
const findUserById = async (id) => {
    const user = await User.findById(id);
    return user || null;
};

const updateUser = async (id, payload = {}) => {
    const user = await findUserById(id);

    user.firstName = payload.firstName || user.firstName;
    user.lastName = payload.lastName || user.lastName;
    user.email = payload.email || user.email;

    return user.save();
};

const deleteUser = async (id) => User.findByIdAndDelete(id);

module.exports = {
    createUser,
    hasUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
};
