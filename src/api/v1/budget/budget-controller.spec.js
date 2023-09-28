/* eslint-disable no-undef */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../app');

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
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Budget controller', () => {
    let jwt = '';
    let budgetId = '';
    let categoryId = '';

    beforeAll(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamuljibon@gmail.com',
            password: 'password',
        });

        jwt = response.body.data.access_token;

        const category = await request(app)
            .post('/api/v1/categories')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Food Items',
                description: 'Write description for this category',
            });

        categoryId = category.body.data.category._id;
    });

    afterAll(async () => {
        await request(app)
            .delete('/api/v1/auth/delete-account')
            .set('Authorization', `Bearer ${jwt}`);
    });

    it('Should create a budget', async () => {
        const response = await request(app)
            .post('/api/v1/budgets')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Food budget',
                type: 'monthly',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                amount: 23000,
                date: '2023-09-14T19:01:14.785Z',
                categoryId,
            });
        budgetId = response.body.data._id;
        expect(response.statusCode).toBe(201);
        expect(response.body.data.title).toBe('Food budget');
        expect(response.body.data.type).toBe('monthly');
        expect(response.body.data.amount).toBe(23000);
    });

    it('Should get all budgets', async () => {
        const response = await request(app)
            .get('/api/v1/budgets')
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
    });

    it('Should get a budget by id', async () => {
        const response = await request(app)
            .get(`/api/v1/budgets/${budgetId}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
    });

    it('Should update a budget', async () => {
        const response = await request(app)
            .patch(`/api/v1/budgets/${budgetId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Food budget',
                type: 'monthly',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                amount: 24000,
                date: '2023-09-14T19:01:14.785Z',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
    });

    it('Should delete a budget', async () => {
        const response = await request(app)
            .delete(`/api/v1/budgets/${budgetId}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(204);
    });
});
