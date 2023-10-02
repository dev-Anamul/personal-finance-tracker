/* eslint-disable no-undef */

const { Transaction } = require('../../model');
const { create, findOneById, removeOneById, updateOneById } = require('./index');
const db = require('../../db/testDbConnection');

beforeAll(async () => {
    await db.setUp();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Transaction service', () => {
    beforeEach(async () => {
        await Transaction.deleteMany({});
    });

    afterAll(async () => {
        await Transaction.deleteMany({});
    });

    it('should create transaction', async () => {
        const transaction = await create({
            title: 'title',
            amount: 100,
            type: 'income',
            date: new Date(),
            categoryId: '5f8d0a8b0f1a9a1b7c9bce1a',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        expect(transaction).toBeDefined();
        expect(transaction.title).toBe('title');
        expect(transaction.amount).toBe(100);
        expect(transaction.type).toBe('income');
    });

    it('should find transaction by id', async () => {
        const transaction = await create({
            title: 'title',
            amount: 100,
            date: new Date(),
            categoryId: '5f8d0a8b0f1a9a1b7c9bce1a',
            type: 'income',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundTransaction = await findOneById(transaction._id);
        expect(foundTransaction).toBeDefined();
        expect(foundTransaction.title).toBe('title');
        expect(foundTransaction.amount).toBe(100);
        expect(foundTransaction.type).toBe('income');
    });

    it('should remove transaction by id', async () => {
        const transaction = await create({
            title: 'title',
            amount: 100,
            date: new Date(),
            categoryId: '5f8d0a8b0f1a9a1b7c9bce1a',
            type: 'income',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const foundTransaction = await removeOneById(transaction._id);
        expect(foundTransaction).toBeDefined();
        expect(foundTransaction.title).toBe('title');
        expect(foundTransaction.amount).toBe(100);
        expect(foundTransaction.type).toBe('income');
    });

    it('should update transaction by id', async () => {
        const transaction = await create({
            title: 'title',
            amount: 100,
            date: new Date(),
            categoryId: '5f8d0a8b0f1a9a1b7c9bce1a',
            type: 'income',
            userId: '5f8d0a8b0f1a9a1b7c9bce1a',
        });
        const updatedTransaction = await updateOneById({
            title: 'title updated',
            amount: 500,
            type: 'income',
            id: transaction._id,
        });
        expect(updatedTransaction).toBeDefined();
        expect(updatedTransaction.title).toBe('title updated');
        expect(updatedTransaction.amount).toBe(500);
        expect(updatedTransaction.type).toBe('income');
    });
});
