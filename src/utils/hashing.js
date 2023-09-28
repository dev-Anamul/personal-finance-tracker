const bcrypt = require('bcryptjs');

const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const compareHash = async (password, hash) => bcrypt.compare(password, hash);

module.exports = {
    generateHash,
    compareHash,
};
