/* eslint-disable no-undef */
const db = require('../../db/testDbConnection');

const { Budget } = require('../../model');
const { create, findOneById, removeOneById, updateOne } = require('./index');

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Budget service', () => {
    let budgetId = null;

    beforeAll(async () => {
        const budget = await create({
            title: 'Food budget',
            type: 'weekly',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            amount: 23000,
            date: '2023-09-14T19:01:14.785Z',
            categoryId: '64d268cdeef8c84bb18912db',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });

        budgetId = budget._id;
    });

    afterAll(async () => {
        await Budget.deleteMany({});
    });

    it('should create Budget', async () => {
        const budget = await create({
            title: 'Food budget 2',
            type: 'monthly',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            amount: 23000,
            date: '2023-09-14T19:01:14.785Z',
            categoryId: '64d268cdeef8c84bb18912db',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(budget).toBeDefined();
        expect(budget.title).toBe('Food budget 2');
        expect(budget.description).toBe(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
        );
        expect(budget.type).toBe('monthly');
        expect(budget.amount).toBe(23000);
    });

    it('should find Budget by id', async () => {
        const foundBudget = await findOneById(budgetId);
        expect(foundBudget).toBeDefined();
        expect(foundBudget.title).toBe('Food budget');
        expect(foundBudget.description).toBe(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
        );
    });

    it('should update Budget by id', async () => {
        const updatedBudget = await updateOne({
            title: 'Update PC updated',
            description: 'I want to update my pc. This is my Budget updated',
            amount: 245000,
            id: budgetId,
        });
        expect(updatedBudget).toBeDefined();
        expect(updatedBudget.title).toBe('Update PC updated');
        expect(updatedBudget.description).toBe('I want to update my pc. This is my Budget updated');
    });

    it('should remove Budget by id', async () => {
        const foundBudget = await removeOneById(budgetId);
        expect(foundBudget).toBeDefined();
        expect(foundBudget.title).toBe('Update PC updated');
        expect(foundBudget.description).toBe('I want to update my pc. This is my Budget updated');
        expect(foundBudget.type).toBe('weekly');
        expect(foundBudget.amount).toBe(245000);
    });
});
