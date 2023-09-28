/* eslint-disable no-undef */
const findAll = require('./find-all'); // Replace with the actual path to your module
const { Budget } = require('../../model');
// Mock Mongoose functions and models
jest.mock('mongoose');
jest.mock('../../model', () => ({
    Budget: {
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
                id: '650c90361854083c4f388b81',
                title: 'Food budget',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                type: 'monthly',
                date: '2023-09-14T19:01:14.785Z',
                amount: 23000,
            },
            {
                id: '650c3848a3481c92cc61e11a',
                title: 'Food budget',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                type: 'monthly',
                date: '2023-09-14T19:01:14.785Z',
                amount: 23000,
            },
        ];
        Budget.find.mockResolvedValue(mockData);
        Budget.countDocuments.mockResolvedValue(2); // Mock the total count

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
        expect(Budget.find).toHaveBeenCalledWith(
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
