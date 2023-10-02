/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../../app');
const db = require('../../../../db/testDbConnection');
require('dotenv').config();

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('PATCH api/v1/auth/update-password', () => {
    let jwt = '';
    beforeEach(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamulhq123@gmail.com',
            password: 'password',
        });
        jwt = response.body.data.access_token;
    });

    it('should update password', async () => {
        const response = await request(app)
            .patch('/api/v1/auth/update-password')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                currentPassword: 'password',
                newPassword: 'newPassword',
                confirmPassword: 'newPassword',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.code).toBe(200);
        expect(response.body.message).toBe('Password updated successfully');
    });
});
