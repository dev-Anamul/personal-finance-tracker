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

describe('DELETE api/v1/auth/delete-account', () => {
    let jwt = '';
    beforeEach(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'haque473@gmail.com',
            password: 'password',
        });
        jwt = response.body.data.access_token;
    });

    it('Should delete logged in user', async () => {
        const response = await request(app)
            .delete('/api/v1/auth/delete-account')
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(204);
    });
});
