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

describe('POST /api/v1/auth/signup', () => {
    it('should signup user', async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamuljibon12354@gmail.com',
            password: 'password235',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.data.access_token).toBeDefined();
        expect(response.body.data.access_token).not.toBeNull();
    });

    it('should not signup user with invalid email', async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamuljibongmail.com',
            password: 'password',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
    });
});
