/* eslint-disable no-undef */
const login = require('./login');

const { badRequest } = require('../../utils/error');
const { compareHash } = require('../../utils/hashing');
const { findUserByEmail } = require('../user');

jest.mock('../../utils/error');
jest.mock('../../utils/hashing');
jest.mock('../user');

describe('login function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the user when email and password are correct', async () => {
        findUserByEmail.mockResolvedValue({
            email: 'anamul@gmail.com',
            password: 'hashedPassword',
        });

        compareHash.mockResolvedValue(true);

        const result = await login({ email: 'anamul@gmail.com', password: 'password' });

        expect(findUserByEmail).toHaveBeenCalledWith('anamul@gmail.com');
        expect(compareHash).toHaveBeenCalledWith('password', 'hashedPassword');

        expect(result).toEqual({
            email: 'anamul@gmail.com',
            password: 'hashedPassword',
        });
    });

    it('should throw a bad request error when email is invaild', async () => {
        findUserByEmail.mockResolvedValue(null);

        try {
            await login({
                email: 'anamul@gmail.com',
                password: '12345678',
            });

            fail('expected login throw a bad request error');
        } catch (error) {
            expect(badRequest).toHaveBeenCalledWith('Invalid email or password');
        }
    });

    it('should throw a badRequest error when password is incorrect', async () => {
        findUserByEmail.mockResolvedValue({
            email: 'test@example.com',
            password: 'hashedPassword', // Mock the hashed password
        });

        compareHash.mockResolvedValue(false);

        try {
            await login({
                email: 'test@example.com',
                password: 'incorrectPassword',
            });

            fail('Expected login to throw a badRequest error');
        } catch (error) {
            expect(badRequest).toHaveBeenCalledWith('Invalid email or password');
        }
    });
});
