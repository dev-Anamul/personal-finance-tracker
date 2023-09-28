/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
const catchAsync = require('./catchAsync');

describe('catchAsync', () => {
    it('should call the provided function with req, res, and next', async () => {
        const req = {};
        const res = {};
        const next = jest.fn();

        const asyncFn = jest.fn().mockResolvedValue();

        const middleware = catchAsync(asyncFn);

        // Call the middleware with the mock req, res, and next
        await middleware(req, res, next);

        expect(asyncFn).toHaveBeenCalledWith(req, res, next);

        // Assert that next was not called since there was no error
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next with an error if the provided function rejects', async () => {
        const req = {};
        const res = {};
        const next = jest.fn();

        const asyncFn = jest.fn().mockRejectedValue(new Error('Test error'));

        const middleware = catchAsync(asyncFn);

        await middleware(req, res, next);
        expect(asyncFn).toHaveBeenCalledWith(req, res, next);

        expect(next).toHaveBeenCalledWith(new Error('Test error'));
    });
});
