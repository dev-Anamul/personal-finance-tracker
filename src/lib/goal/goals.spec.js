/* eslint-disable no-undef */

const db = require('../../db/testDbConnection');
const { Goal } = require('../../model');
const { create, findOne, remove, update } = require('./index');

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Goal service', () => {
    beforeEach(async () => {
        await Goal.deleteMany({});
    });

    afterAll(async () => {
        await Goal.deleteMany({});
    });

    it('should create Goal', async () => {
        const goal = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my goal',
            targetAmount: 30000,
            currentProgress: 5000,
            targetDate: '2023-09-14T19:01:14.785Z',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(goal).toBeDefined();
        expect(goal.title).toBe('Update PC');
        expect(goal.targetAmount).toBe(30000);
        expect(goal.currentProgress).toBe(5000);
        expect(goal.targetDate).toBeDefined();
    });

    it('should find Goal by id', async () => {
        const goal = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my goal',
            targetAmount: 30000,
            currentProgress: 5000,
            targetDate: '2023-09-14T19:01:14.785Z',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundGoal = await findOne(goal._id);
        expect(foundGoal).toBeDefined();
        expect(foundGoal.title).toBe('Update PC');
        expect(foundGoal.targetAmount).toBe(30000);
        expect(foundGoal.currentProgress).toBe(5000);
    });

    it('should remove Goal by id', async () => {
        const goal = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my goal',
            targetAmount: 30000,
            currentProgress: 5000,
            targetDate: '2023-09-14T19:01:14.785Z',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundGoal = await remove(goal._id);
        expect(foundGoal).toBeDefined();
        expect(foundGoal.title).toBe('Update PC');
        expect(foundGoal.targetAmount).toBe(30000);
        expect(foundGoal.currentProgress).toBe(5000);
    });

    it('should update Goal by id', async () => {
        const goal = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my goal',
            targetAmount: 30000,
            currentProgress: 5000,
            targetDate: '2023-09-14T19:01:14.785Z',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const updatedGoal = await update({
            title: 'Update PC updated',
            targetAmount: 40000,
            id: goal._id,
        });
        expect(updatedGoal).toBeDefined();
        expect(updatedGoal.title).toBe('Update PC updated');
        expect(updatedGoal.targetAmount).toBe(40000);
    });
});
