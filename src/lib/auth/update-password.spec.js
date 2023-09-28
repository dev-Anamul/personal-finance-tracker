/* eslint-disable no-undef */
const updatePassword = require('./update-password'); // Replace with the actual path to your module
const { findUserById } = require('../user'); // Import findUserById separately
const { badRequest } = require('../../utils/error'); // Import badRequest separately

jest.mock('../user');
jest.mock('../../utils/error');

describe('updatePassword function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update the user password when the user exists', async () => {
        const mockUser = {
            _id: 'user123',
            password: 'oldPassword',
            save: jest.fn(),
        };
        findUserById.mockResolvedValue(mockUser);
        await updatePassword('user123', 'newPassword');

        expect(findUserById).toHaveBeenCalledWith('user123');

        expect(mockUser.password).toBe('newPassword');

        expect(mockUser.save).toHaveBeenCalled();
    });

    it('should throw a badRequest error when the user does not exist', async () => {
        findUserById.mockResolvedValue(null);

        try {
            await updatePassword('nonExistentUser', 'newPassword');

            fail('Expected updatePassword to throw a badRequest error');
        } catch (error) {
            expect(badRequest).toHaveBeenCalledWith('User not found');
        }
    });
});
