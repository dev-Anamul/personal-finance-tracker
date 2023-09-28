/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { User } = require('../../model');
const {
    createUser,
    findUserByEmail,
    findUserById,
    hasUser,
    updateUser,
    deleteUser,
} = require('./index');

require('dotenv').config();

const mongoTestURI = process.env.MONGO_TEST_CONNECTION_STRING;
const testDbName = process.env.MONGO_TEST_DB_NAME;

beforeAll(async () => {
    await mongoose.connect(`${mongoTestURI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: testDbName,
        authSource: 'admin',
    });
});

afterAll(async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('User service', () => {
    const email = 'anamul@gmail.com';
    let id = null;

    beforeAll(async () => {
        const user = await createUser({
            firstName: 'anamul',
            lastName: 'haque',
            email,
            password: 'password',
        });

        id = user._id;
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should create user', async () => {
        const user = await createUser({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            password: 'password',
        });
        expect(user).toBeDefined();
        expect(user.firstName).toBe('John');
        expect(user.lastName).toBe('Doe');
        expect(user.email).toBe('john@gmail.com');
    });

    it('should find uer by email', async () => {
        const user = await findUserByEmail(email);
        const user2 = await findUserByEmail('john1@gmail.com');
        expect(user).toBeDefined();
        expect(user.firstName).toBe('anamul');
        expect(user.lastName).toBe('haque');
        expect(user.email).toBe('anamul@gmail.com');
        expect(user2).toBeNull();
    });

    it('should find user by id', async () => {
        const user = await findUserById(id);
        expect(user).toBeDefined();
        expect(user.firstName).toBe('anamul');
        expect(user.lastName).toBe('haque');
        expect(user.email).toBe('anamul@gmail.com');
    });

    it('should check if user exists', async () => {
        const user = await hasUser(email);
        const user2 = await hasUser('jhon1@gmail.com');
        expect(user).toBe(true);
        expect(user2).toBe(false);
    });

    it('should update user', async () => {
        const updatedUser = await updateUser(id, {
            firstName: 'AnamulHQ',
            lastName: 'Jibon',
            email: 'anamulhq@gmail.com',
        });

        expect(updatedUser).toBeDefined();
        expect(updatedUser.firstName).toBe('AnamulHQ');
        expect(updatedUser.lastName).toBe('Jibon');
        expect(updatedUser.email).toBe('anamulhq@gmail.com');
    });

    it('should delete user', async () => {
        const deletedUser = await deleteUser(id);
        expect(deletedUser).toBeDefined();
        expect(deletedUser.firstName).toBe('AnamulHQ');
        expect(deletedUser.lastName).toBe('Jibon');
        expect(deletedUser.email).toBe('anamulhq@gmail.com');
    });
});
