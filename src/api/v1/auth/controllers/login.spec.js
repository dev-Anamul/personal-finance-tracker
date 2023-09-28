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

describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
        await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamulhq1234@gmail.com',
            password: 'password',
        });
    });

    it('should login user', async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'anamulhq1234@gmail.com',
            password: 'password',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.data.access_token).toBeDefined();
        expect(response.body.data.access_token).not.toBeNull();
    });

    it('should not login user with wrong password', async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'anamulhq1234@gmail.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('Invalid email or password');
    });

    it('should not login user with wrong email', async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'anamulhq12345@gmail.com',
            password: 'password',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('Invalid email or password');
    });
});
