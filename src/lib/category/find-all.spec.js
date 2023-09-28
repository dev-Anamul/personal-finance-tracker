/* eslint-disable no-undef */
const findAll = require('./find-all'); // Replace with the actual path to your module
const { Category } = require('../../model');
// Mock Mongoose functions and models
jest.mock('mongoose');
jest.mock('../../model', () => ({
    Category: {
        find: jest.fn(),
        countDocuments: jest.fn(),
    },
}));

describe('findAll function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return paginated and filtered categories', async () => {
        // Mock the Mongoose Transaction model's find and countDocuments methods
        const mockData = [
            {
                id: '650c385ca3481c92cc61e11d',
                title: 'Clothes',
                description: 'Write description for this category',
                createdAt: '2023-09-21T12:34:36.084Z',
                updatedAt: '2023-09-21T12:34:36.084Z',
            },
            {
                id: '650c3848a3481c92cc61e11a',
                title: 'Electronics',
                description: 'Write description for this category',
                createdAt: '2023-09-21T12:34:16.583Z',
                updatedAt: '2023-09-21T12:34:16.583Z',
            },
        ];
        Category.find.mockResolvedValue(mockData);
        Category.countDocuments.mockResolvedValue(2); // Mock the total count

        // Define your test input
        const options = {
            page: 1,
            limit: 10,
            order: 'asc',
            sort: 'createdAt',
            search: 'searchQuery',
            userId: 'user123',
        };

        // Call the findAll function with your test input
        const result = await findAll(options);

        // Assert that Mongoose methods were called with the expected query and options
        expect(Category.find).toHaveBeenCalledWith(
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
            })
        );

        // Assert that the result matches your expectations
        expect(result.page).toBe(1);
        expect(result.limit).toBe(10);
        expect(result.totalItems).toBe(2); // Mocked total count
        // Ensure that data is properly processed based on your mock data
        expect(result.data).toBeDefined();
    });
});
