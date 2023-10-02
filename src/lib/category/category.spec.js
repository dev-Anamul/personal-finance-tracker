/* eslint-disable no-undef */

const db = require('../../db/testDbConnection');
const { Category } = require('../../model');
const { create, findOne, hasCategory, remove, update } = require('./index');

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Category service', () => {
    beforeEach(async () => {
        await Category.deleteMany({});
    });

    afterAll(async () => {
        await Category.deleteMany({});
    });

    it('should create Category', async () => {
        const category = await create({
            title: 'Food Items',
            description: 'Write description for this category',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(category).toBeDefined();
        expect(category.title).toBe('Food Items');
        expect(category.description).toBe('Write description for this category');
    });

    it('should find Category by id', async () => {
        const category = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my Category',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundCategory = await findOne(category._id);
        expect(foundCategory).toBeDefined();
        expect(foundCategory.title).toBe('Update PC');
        expect(foundCategory.description).toBe('I want to update my pc. This is my Category');
    });

    it('should remove Category by id', async () => {
        const category = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my Category',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundCategory = await remove(category._id);
        expect(foundCategory).toBeDefined();
        expect(foundCategory.title).toBe('Update PC');
        expect(foundCategory.description).toBe('I want to update my pc. This is my Category');
    });

    it('should check if Category exists', async () => {
        const category = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my Category',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundCategory = await hasCategory(category._id);
        const notFoundCategory = await hasCategory('5f8d0a8b0f1a9a1b7c9bce1a');
        expect(foundCategory).toBeDefined();
        expect(foundCategory).toBe(true);
        expect(notFoundCategory).toBeDefined();
        expect(notFoundCategory).toBe(false);
    });

    it('should update Category by id', async () => {
        const category = await create({
            title: 'Update PC',
            description: 'I want to update my pc. This is my Category',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const updatedCategory = await update({
            title: 'Update PC updated',
            description: 'I want to update my pc. This is my Category updated',
            targetAmount: 40000,
            id: category._id,
        });
        expect(updatedCategory).toBeDefined();
        expect(updatedCategory.title).toBe('Update PC updated');
        expect(updatedCategory.description).toBe(
            'I want to update my pc. This is my Category updated'
        );
    });
});
