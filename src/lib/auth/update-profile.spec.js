/* eslint-disable no-undef */
const updateProfile = require('./update-profile');

jest.mock('../user', () => {
    const originalModule = jest.requireActual('../user');

    return {
        ...originalModule,
        findUserById: jest.fn(),
        updateUser: jest.fn(),
    };
});

const { findUserById, updateUser } = require('../user');

describe('Update profile service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update profile', async () => {
        const existingUser = {
            id: '123456789',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'hashedPassword',
        };

        findUserById.mockResolvedValue(existingUser);

        const user = {
            id: '123456789',
            firstName: 'Anamul',
            lastName: 'Haque',
            email: 'anamulhq@gmail.com',
            password: 'hashedPassword',
        };

        updateUser.mockResolvedValue(user);

        const updatedData = await updateProfile(user.id, {
            firstName: 'Anamul',
            lastName: 'Haque',
            email: 'anamulhq@gmail.com',
        });

        expect(updatedData).toBeDefined();
        expect(updatedData).toMatchObject(user);
        expect(updatedData).toEqual(user);
    });
    it('should throw error if user not found', async () => {
        findUserById.mockResolvedValue(null);

        await expect(
            updateProfile('123', {
                firstName: 'Anamul',
                lastName: 'Haque',
                email: 'anamul@gmail.com',
                password: 'hashedPassword',
            })
        ).rejects.toThrow('User not found');

        expect(updateUser).not.toHaveBeenCalled();
    });

    it('should throw error if email already exists', async () => {
        const existingUser = {
            id: '123456789',
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamul@gmail.com',
            password: 'hashedPassword',
        };

        findUserById.mockResolvedValue(existingUser);

        const payload = {
            email: 'anamul@gmail.com',
        };

        await expect(updateProfile('123456789', payload)).rejects.toThrow('Email already exists');

        expect(updateUser).not.toHaveBeenCalled();
    });
});
