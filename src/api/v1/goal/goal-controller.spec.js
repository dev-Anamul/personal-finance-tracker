/* eslint-disable no-undef */
const request = require('supertest');
const db = require('../../../db/testDbConnection');
const app = require('../../../app');
require('dotenv').config();

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Goal controller', () => {
    let jwt = '';
    let goalId = '';

    beforeAll(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamul12@gmail.com',
            password: 'password12',
        });

        jwt = response.body.data.access_token;
    });

    afterAll(async () => {
        await request(app)
            .delete('/api/v1/auth/delete-account')
            .set('Authorization', `Bearer ${jwt}`);
    });

    it('Should create a goal', async () => {
        const response = await request(app)
            .post('/api/v1/goals')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Update PC',
                description: 'I want to update my pc. This is my goal',
                targetAmount: 30000,
                currentProgress: 5000,
                targetDate: new Date(),
            });

        goalId = response.body.data._id;

        expect(response.statusCode).toBe(201);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.title).toBe('Update PC');
        expect(response.body.data.description).toBe('I want to update my pc. This is my goal');
    });

    it('Should get all goals', async () => {
        const response = await request(app)
            .get('/api/v1/goals')
            .set('Authorization', `Bearer ${jwt}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBe(1);
    });

    it('Should get a goal by id', async () => {
        const goalResponse = await request(app)
            .get(`/api/v1/goals/${goalId}`)
            .set('Authorization', `Bearer ${jwt}`);

        expect(goalResponse.statusCode).toBe(200);
        expect(goalResponse.body.data).toBeDefined();
        expect(goalResponse.body.data.title).toBe('Update PC');
        expect(goalResponse.body.data.description).toBe('I want to update my pc. This is my goal');
    });

    it('Should update a goal', async () => {
        const goalResponse = await request(app)
            .put(`/api/v1/goals/${goalId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Update PC Updated',
                description: 'I want to update my pc. This is my goal updated',
                targetAmount: 30000,
                currentProgress: 5000,
                targetDate: new Date(),
            });

        expect(goalResponse.statusCode).toBe(200);
        expect(goalResponse.body.data).toBeDefined();
        expect(goalResponse.body.data.title).toBe('Update PC Updated');
        expect(goalResponse.body.data.description).toBe(
            'I want to update my pc. This is my goal updated'
        );
    });

    it('Should delete a goal', async () => {
        const goalResponse = await request(app)
            .delete(`/api/v1/goals/${goalId}`)
            .set('Authorization', `Bearer ${jwt}`);

        expect(goalResponse.statusCode).toBe(204);
    });
});
