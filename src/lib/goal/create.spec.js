/* eslint-disable no-undef */
const mongoose = require('mongoose');
const createGoal = require('./create');

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

afterEach(async () => {
    const { collections } = mongoose.connection;

    await Promise.all(
        Object.keys(collections).map((key) => {
            const collection = collections[key];
            return collection.deleteMany();
        })
    );
});

describe('create goal', () => {
    it('should create goal if all fields are valid', async () => {
        const goal = await createGoal({
            title: 'title',
            description: 'description',
            targetAmount: 100,
            currentProgress: 0,
            targetDate: new Date(),
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(goal).toBeDefined();
        expect(goal.title).toBe('title');
        expect(goal.description).toBe('description');
        expect(goal.targetAmount).toBe(100);
        expect(goal.currentProgress).toBe(0);
        expect(goal.targetDate).toBeDefined();
    });
    it("should throw error if title doesn't exist", async () => {
        await expect(
            createGoal({
                description: 'description',
                targetAmount: 100,
                currentProgress: 0,
                targetDate: new Date(),
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it('should throw error if title is empty', async () => {
        await expect(
            createGoal({
                title: '',
                description: 'description',
                targetAmount: 100,
                currentProgress: 0,
                targetDate: new Date(),
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it("should create goal if description doesn't exist or empty", async () => {
        const goal = await createGoal({
            title: 'title',
            targetAmount: 100,
            currentProgress: 0,
            targetDate: new Date(),
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(goal).toBeDefined();
        expect(goal.title).toBe('title');
        expect(goal.description).toBeUndefined();
        expect(goal.targetAmount).toBe(100);
        expect(goal.currentProgress).toBe(0);
        expect(goal.targetDate).toBeDefined();
    });

    it("should throw error if targetAmount doesn't exist", async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                currentProgress: 0,
                targetDate: new Date(),
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it('should throw error if targetAmount is empty', async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                targetAmount: '',
                currentProgress: 0,
                targetDate: new Date(),
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it("should return 0 if currentProgress doesn't exist", async () => {
        const goal = await createGoal({
            title: 'title',
            description: 'description',
            targetAmount: 100,
            targetDate: new Date(),
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });

        expect(goal).toBeDefined();
        expect(goal.title).toBe('title');
        expect(goal.currentProgress).toBe(0);
    });

    it('should throw error if currentProgress is empty', async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                targetAmount: 100,
                currentProgress: '',
                targetDate: new Date(),
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });
    it("should throw error if targetDate doesn't exist", async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                targetAmount: 100,
                currentProgress: 0,
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it('should throw error if targetDate is empty', async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                targetAmount: 100,
                currentProgress: 0,
                targetDate: '',
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });
    it("should throw error if userId doesn't exist", async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                targetAmount: 100,
                currentProgress: 0,
                targetDate: new Date(),
            })
        ).rejects.toThrow();
    });

    it('should throw error if userId is empty', async () => {
        await expect(
            createGoal({
                title: 'title',
                description: 'description',
                targetAmount: 100,
                currentProgress: 0,
                targetDate: new Date(),
                userId: '',
            })
        ).rejects.toThrow();
    });
});
