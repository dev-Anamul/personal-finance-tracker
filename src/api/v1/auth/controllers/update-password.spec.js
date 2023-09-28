/* eslint-disable no-undef */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../app');
require('dotenv').config();

const mongoTestURI = process.env.MONGO_TEST_CONNECTION_STRING;
const testDbName = process.env.MONGO_TEST_DB_NAME;

beforeAll(async () => {
    await mongoose.connect(`${mongoTestURI}`, {
        dbName: testDbName,
        authSource: 'admin',
    });
});

afterAll(async () => {
    await mongoose.connection.close();
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
