const bcrypt = require('bcryptjs')

const generatePasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const userPasswordHashed = await bcrypt.hash(password, salt);
    return userPasswordHashed;
}

module.exports = generatePasswordHash;