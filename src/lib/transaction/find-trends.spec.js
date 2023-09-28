/* eslint-disable no-undef */
const findTrend = require('./find-trends'); // Replace with the actual path to your module
const { Transaction } = require('../../model');
const { groupId, idFormate, sortId } = require('../../utils/aggregate');

// Mock Mongoose functions and models
jest.mock('../../model');

describe('findTrend function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return transaction trends based on provided filters', async () => {
        // Mock the Mongoose Transaction model's aggregate method
        Transaction.aggregate.mockResolvedValue([
            { frequency: 'daily', totalAmount: 100, count: 10 },
            { frequency: 'weekly', totalAmount: 500, count: 5 },
            // Add more mock data as needed
        ]);

        // Define your test input
        const options = {
            type: 'expense',
            startDate: '2023-01-01',
            endDate: '2023-01-31',
            frequency: 'month',
            userId: 'user123',
        };

        // Call the findTrend function with your test input
        const result = await findTrend(options);

        // Assert that the Mongoose aggregate method was called with the expected pipeline
        // You can add more specific assertions based on your aggregation pipeline
        expect(Transaction.aggregate).toHaveBeenCalledWith(
            expect.arrayContaining([
                {
                    $match: {
                        userId: 'user123',
                        type: 'expense',
                        date: {
                            $gte: new Date('2023-01-01'),
                            $lte: new Date('2023-01-31'),
                        },
                    },
                },
                {
                    $group: {
                        _id: groupId('month'),
                        totalAmount: { $sum: '$amount' },
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: sortId('month'),
                },
                {
                    $project: {
                        _id: 0,
                        totalAmount: 1,
                        count: 1,
                        frequency: 'month',
                        ...idFormate('month'),
                    },
                },
            ])
        );

        // Assert that the result matches your expectations based on the mocked data
        expect(result).toEqual([
            { frequency: 'daily', totalAmount: 100, count: 10 },
            { frequency: 'weekly', totalAmount: 500, count: 5 },
            // Add more expected result data based on your aggregation pipeline
        ]);
    });
});
