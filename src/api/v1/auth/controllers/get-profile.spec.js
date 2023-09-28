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

describe('GET api/v1/auth/profile', () => {
    let jwt = '';
    beforeEach(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamulhaque123@gmail.com',
            password: 'password',
        });

        jwt = response.body.data.access_token;
    });

    it('Should return logged in user info', async () => {
        const response = await request(app)
            .get('/api/v1/auth/profile')
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.code).toBe(200);
        expect(response.body.data.user.firstName).toBe('anamul');
        expect(response.body.data.user.lastName).toBe('haque');
        expect(response.body.data.user.email).toBe('anamulhaque123@gmail.com');
    });
});
