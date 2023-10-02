/* eslint-disable no-undef */
const request = require('supertest');
const db = require('../../../../db/testDbConnection');
const app = require('../../../../app');
require('dotenv').config();

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase;
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
