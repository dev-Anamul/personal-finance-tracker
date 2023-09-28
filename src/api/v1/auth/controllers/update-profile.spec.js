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

describe('PATCH api/v1/auth/update-profile', () => {
    let jwt = '';
    beforeEach(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamuljibon123@gmail.com',
            password: 'password',
        });

        jwt = response.body.data.access_token;
    });

    it('should update profile', async () => {
        const response = await request(app)
            .patch('/api/v1/auth/update-profile')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                firstName: 'anamul updated',
                lastName: 'haque updated',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.code).toBe(200);
        expect(response.body.data.user.firstName).toBe('anamul updated');
        expect(response.body.data.user.lastName).toBe('haque updated');
    });
});
