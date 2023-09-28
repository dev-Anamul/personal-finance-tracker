/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const { generateHash, compareHash } = require('./hashing');

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('generateHash', () => {
    it('should generate a hash', async () => {
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('saltedHashPassword');

        const result = await generateHash('password');

        expect(result).toEqual('saltedHashPassword');
        expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledWith('password', 'salt');
    });
});

describe('compareHash', () => {
    it('should return true if password matches', async () => {
        bcrypt.compare.mockResolvedValue(true);

        const result = await compareHash('password', 'hashPassword');

        expect(result).toEqual(true);
        expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashPassword');
    });

    it('should return false if password does not match', async () => {
        bcrypt.compare.mockResolvedValue(false);

        const result = await compareHash('password', 'hash');

        expect(result).toEqual(false);
        expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hash');
    });
});
