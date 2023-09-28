/* eslint-disable no-undef */
const signup = require('./signup');

jest.mock('../user', () => ({
    createUser: jest.fn(),
    hasUser: jest.fn(),
}));

jest.mock('../../utils/hashing', () => ({
    generateHash: jest.fn(),
}));

const { createUser, hasUser } = require('../user');
const { generateHash } = require('../../utils/hashing');

describe('Signup service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should signup user', async () => {
        hasUser.mockResolvedValue(false);
        generateHash.mockResolvedValue('hashedPassword');

        const expectedUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'hashedPassword',
        };

        createUser.mockResolvedValue(expectedUser);

        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'passworddd',
        };

        const user = await signup(userData);

        expect(user).toBeDefined();
        expect(user).toMatchObject(expectedUser);
        expect(user).toEqual(expectedUser);

        expect(hasUser).toHaveBeenCalledTimes(1);
        expect(hasUser).toHaveBeenCalledWith('johndoe@gmail.com');

        expect(generateHash).toHaveBeenCalledTimes(1);
        expect(generateHash).toHaveBeenCalledWith('passworddd');

        expect(createUser).toHaveBeenCalledTimes(1);
        expect(createUser).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'hashedPassword',
        });
    });

    it('should throw error if user already exists', async () => {
        hasUser.mockResolvedValue(true);

        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jhondoe@gmail.com',
            password: 'password',
        };

        await expect(signup(userData)).rejects.toThrow('User already exists');

        expect(hasUser).toHaveBeenCalledTimes(1);
        expect(hasUser).toHaveBeenCalledWith('jhondoe@gmail.com');

        expect(generateHash).not.toHaveBeenCalled();
        expect(createUser).not.toHaveBeenCalled();
    });
});
