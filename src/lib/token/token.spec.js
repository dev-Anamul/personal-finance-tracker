/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const { decodeToken, generateToken, verifyToken } = require('./index');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    decode: jest.fn(),
    verify: jest.fn(),
}));

describe('generateToken', () => {
    it('should generate a token', () => {
        generateToken({ id: 1 });

        expect(jwt.sign).toHaveBeenCalledTimes(1);
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
    });
});

describe('decodeToken', () => {
    it('should decode a token', () => {
        decodeToken('token');

        expect(jwt.decode).toHaveBeenCalledTimes(1);
        expect(jwt.decode).toHaveBeenCalledWith('token', { algorithms: ['HS256'] });
    });
});
describe('verifyToken', () => {
    it('should verify a token', () => {
        verifyToken('token');

        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(jwt.verify).toHaveBeenCalledWith('token', process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });
    });
});
