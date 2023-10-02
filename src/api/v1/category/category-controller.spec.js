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

describe('Category controller', () => {
    let jwt = '';
    let categoryId = '';

    beforeAll(async () => {
        const response = await request(app).post('/api/v1/auth/signup').send({
            firstName: 'anamul',
            lastName: 'haque',
            email: 'anamulhq@gmail.com',
            password: 'password',
        });

        jwt = response.body.data.access_token;
    });

    afterAll(async () => {
        await request(app)
            .delete('/api/v1/auth/delete-account')
            .set('Authorization', `Bearer ${jwt}`);
    });

    it('Should create a category', async () => {
        const response = await request(app)
            .post('/api/v1/categories')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Food Items',
                description: 'Write description for this category',
            });

        categoryId = response.body.data.category._id;
        expect(response.statusCode).toBe(201);
        expect(response.body.data.category).toBeDefined();
        expect(response.body.data.category.title).toBe('Food Items');
        expect(response.body.data.category.description).toBe('Write description for this category');
    });

    it('Should get all categories', async () => {
        const response = await request(app)
            .get('/api/v1/categories')
            .set('Authorization', `Bearer ${jwt}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBe(1);
    });

    it('Should get a category by id', async () => {
        const categoryResponse = await request(app)
            .get(`/api/v1/categories/${categoryId}`)
            .set('Authorization', `Bearer ${jwt}`);

        expect(categoryResponse.statusCode).toBe(200);
        expect(categoryResponse.body.data).toBeDefined();
        expect(categoryResponse.body.data.title).toBe('Food Items');
        expect(categoryResponse.body.data.description).toBe('Write description for this category');
    });

    it('Should update a category', async () => {
        const categoryResponse = await request(app)
            .put(`/api/v1/categories/${categoryId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Food Items Updated',
                description: 'Write description for this category updated',
            });

        expect(categoryResponse.statusCode).toBe(200);
        expect(categoryResponse.body.data).toBeDefined();
        expect(categoryResponse.body.data.title).toBe('Food Items Updated');
        expect(categoryResponse.body.data.description).toBe(
            'Write description for this category updated'
        );
    });

    it('Should delete a category', async () => {
        const categoryResponse = await request(app)
            .delete(`/api/v1/categories/${categoryId}`)
            .set('Authorization', `Bearer ${jwt}`);

        expect(categoryResponse.statusCode).toBe(204);
    });

    // it('Should get all transactions by category id', async () => {
    //     const response = await request(app)
    //         .get('/api/v1/categories')
    //         .set('Authorization', `Bearer ${jwt}`);

    //     const categoryId = response.body.data.categories[0]._id;

    //     const categoryResponse = await request(app)
    //         .get(`/api/v1/categories/${categoryId}/budgets`)
    //         .set('Authorization', `Bearer ${jwt}`);

    //     expect(categoryResponse.statusCode).toBe(200);
    //     expect(categoryResponse.body.data.budgets).toBeDefined();
    //     expect(categoryResponse.body.data.budgets.length).toBe(0);
    // });
});
