/* eslint-disable no-undef */
const transactionStats = require('./stats'); // Replace with the actual path to your module
const { Transaction } = require('../../model');

// Mock Mongoose functions and models
jest.mock('../../model');

describe('transactionStats function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return transaction statistics based on provided filters', async () => {
        // Mock the Mongoose Transaction model's aggregate method
        Transaction.aggregate.mockResolvedValue([
            { type: 'expense', totalAmount: 100, count: 10 },
            { type: 'income', totalAmount: 500, count: 5 },
            // Add more mock data as needed
        ]);

        // Define your test input
        const options = {
            startDate: '2023-01-01',
            endDate: '2023-01-31',
            userId: 'user123',
        };

        // Call the transactionStats function with your test input
        const result = await transactionStats(options);

        // Assert that the Mongoose aggregate method was called with the expected pipeline
        // You can add more specific assertions based on your aggregation pipeline
        expect(Transaction.aggregate).toHaveBeenCalledWith(
            expect.arrayContaining([
                {
                    $match: {
                        userId: 'user123',
                        date: {
                            $gte: new Date('2023-01-01'),
                            $lte: new Date('2023-01-31'),
                        },
                    },
                },
                {
                    $group: {
                        _id: '$type',
                        totalAmount: { $sum: '$amount' },
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        type: '$_id',
                        totalAmount: 1,
                        count: 1,
                    },
                },
            ])
        );

        // Assert that the result matches your expectations based on the mocked data
        expect(result).toEqual([
            { type: 'expense', totalAmount: 100, count: 10 },
            { type: 'income', totalAmount: 500, count: 5 },
            // Add more expected result data based on your aggregation pipeline
        ]);
    });
});
