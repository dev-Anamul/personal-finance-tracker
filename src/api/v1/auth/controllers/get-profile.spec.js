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
