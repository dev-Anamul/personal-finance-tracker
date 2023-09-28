/* eslint-disable no-undef */
const AppError = require('./AppError');

describe('AppError class', () => {
    it('should create an instance of AppError with the provided properties', () => {
        const message = 'Test error message';
        const statusCode = 404;

        const error = new AppError(message, statusCode);

        expect(error instanceof AppError).toBe(true);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(statusCode);
        expect(error.status).toBe('fail');
        expect(error.isOperational).toBe(true);
        expect(error.stack).toBeDefined();
    });

    it('should set status to "error" for status codes starting with 5', () => {
        const message = 'Test error message';
        const statusCode = 500;

        const error = new AppError(message, statusCode);

        expect(error.status).toBe('error');
    });

    it('should capture a stack trace', () => {
        const message = 'Test error message';
        const statusCode = 404;

        const error = new AppError(message, statusCode);

        // Ensure that a stack trace is captured
        expect(error.stack).toBeDefined();
    });
});
