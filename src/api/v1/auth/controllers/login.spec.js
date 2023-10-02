/* eslint-disable no-undef */
const request = require('supertest');
const db = require('../../../../db/testDbConnection');
const app = require('../../../../app');
require('dotenv').config();

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
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
