/* eslint-disable no-undef */
const createCategory = require('./create');
const db = require('../../db/testDbConnection');

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

afterEach(async () => {
    await db.dropCollections();
});

describe('create category', () => {
    it('should create category', async () => {
        const category = await createCategory({
            title: 'category',
            description: 'description',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(category).toBeDefined();
        expect(category.title).toBe('category');
        expect(category.description).toBe('description');
    });

    it("should throw error if title doesn't exist", async () => {
        await expect(
            createCategory({
                description: 'description',
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it('should throw error if title is empty', async () => {
        await expect(
            createCategory({
                title: '',
                description: 'description',
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it("should throw error if description doesn't exist", async () => {
        await expect(
            createCategory({
                title: 'category',
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it('should throw error if description is empty', async () => {
        await expect(
            createCategory({
                title: 'category',
                description: '',
                userId: '5f8d0a8b0f1a9a1b7c9bce1a',
            })
        ).rejects.toThrow();
    });

    it("should throw error if userId doesn't exist", async () => {
        await expect(
            createCategory({
                title: 'category',
                description: 'description',
            })
        ).rejects.toThrow();
    });

    it('should throw error if userId is empty', async () => {
        await expect(
            createCategory({
                title: 'category',
                description: 'description',
                userId: '',
            })
        ).rejects.toThrow();
    });
});
