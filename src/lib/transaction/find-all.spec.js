/* eslint-disable no-undef */
const findAll = require('./find-all'); // Replace with the actual path to your module
const { Transaction } = require('../../model');
// Mock Mongoose functions and models
jest.mock('mongoose');
jest.mock('../../model', () => ({
    Transaction: {
        find: jest.fn(),
        countDocuments: jest.fn(),
    },
}));

describe('findAll function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return paginated and filtered transactions', async () => {
        // Mock the Mongoose Transaction model's find and countDocuments methods
        const mockData = [
            {
                id: '650c3cca5a84a99d91e6e4dc',
                title: 'eaque',
                description: 'Perspiciatis beatae nobis.',
                createdAt: '2023-09-21T12:53:30.197Z',
                updatedAt: '2023-09-21T12:53:30.197Z',
                date: '2024-06-12T11:44:44.125Z',
                amount: 207.7,
            },
            {
                id: '650c3cca5a84a99d91e6e4dc',
                title: 'eaque',
                description: 'Perspiciatis beatae nobis.',
                createdAt: '2023-09-21T12:53:30.197Z',
                updatedAt: '2023-09-21T12:53:30.197Z',
                date: '2024-06-12T11:44:44.125Z',
                amount: 207.7,
            },
        ];
        Transaction.find.mockResolvedValue(mockData);
        Transaction.countDocuments.mockResolvedValue(10); // Mock the total count

        // Define your test input
        const options = {
            page: 1,
            limit: 10,
            order: 'asc',
            sort: 'createdAt',
            search: 'searchQuery',
            userId: 'user123',
            expand: 'category',
        };

        // Call the findAll function with your test input
        const result = await findAll(options);

        // Assert that Mongoose methods were called with the expected query and options
        expect(Transaction.find).toHaveBeenCalledWith(
            expect.objectContaining({
                $and: [
                    { userId: options.userId },
                    {
                        $or: [
                            { title: { $regex: options.search, $options: 'i' } },
                            { description: { $regex: options.search, $options: 'i' } },
                        ],
                    },
                ],
            }),
            {},
            expect.objectContaining({
                skip: 0,
                limit: options.limit,
                sort: { createdAt: 1 }, // Adjust based on your test input
                populate: ['category'],
            })
        );

        // Assert that the result matches your expectations
        expect(result.page).toBe(1);
        expect(result.limit).toBe(10);
        expect(result.totalItems).toBe(10); // Mocked total count
        // Ensure that data is properly processed based on your mock data
        expect(result.data).toBeDefined();
    });
});
