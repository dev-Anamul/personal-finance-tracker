/* eslint-disable no-undef */
const matchPassword = require('./matchPassword');

describe('matchPassword', () => {
    it('should return true if password matches', () => {
        const password = 'password';
        const confirmPassword = 'password';

        const result = matchPassword(password, confirmPassword);

        expect(result).toEqual(true);
    });

    it('should return false if password does not match', () => {
        const password = 'password';
        const confirmPassword = 'password1';

        const result = matchPassword(password, confirmPassword);

        expect(result).toEqual(false);
    });
});
