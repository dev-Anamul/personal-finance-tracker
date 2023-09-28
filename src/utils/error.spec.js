/* eslint-disable no-undef */
const {
    authenticationError,
    authorizationError,
    badRequest,
    notFound,
    serverError,
} = require('./error');

describe('notFound', () => {
    it('should return a not found error', () => {
        const result = notFound();

        expect(result.message).toEqual('Resource not found');
        expect(result.status).toEqual(404);
    });

    it('should return a not found error with custom message', () => {
        const result = notFound('Custom Message');

        expect(result.message).toEqual('Custom Message');
        expect(result.status).toEqual(404);
    });
});

describe('badRequest', () => {
    it('should return a bad request error', () => {
        const result = badRequest();

        expect(result.message).toEqual('Bad Request');
        expect(result.status).toEqual(400);
    });

    it('should return a bad request error with custom message', () => {
        const result = badRequest('Custom Message');

        expect(result.message).toEqual('Custom Message');
        expect(result.status).toEqual(400);
    });
});

describe('serverError', () => {
    it('should return a server error', () => {
        const result = serverError();

        expect(result.message).toEqual('Internal Server Error');
        expect(result.status).toEqual(500);
    });

    it('should return a server error with custom message', () => {
        const result = serverError('Custom Message');

        expect(result.message).toEqual('Custom Message');
        expect(result.status).toEqual(500);
    });
});

describe('authenticationError', () => {
    it('should return a authentication error', () => {
        const result = authenticationError();

        expect(result.message).toEqual('Authentication Failed');
        expect(result.status).toEqual(401);
    });

    it('should return a authentication error with custom message', () => {
        const result = authenticationError('Custom Message');

        expect(result.message).toEqual('Custom Message');
        expect(result.status).toEqual(401);
    });
});

describe('authorizationError', () => {
    it('should return a authorization error', () => {
        const result = authorizationError();

        expect(result.message).toEqual('Permission Denied');
        expect(result.status).toEqual(403);
    });

    it('should return a authorization error with custom message', () => {
        const result = authorizationError('Custom Message');

        expect(result.message).toEqual('Custom Message');
        expect(result.status).toEqual(403);
    });
});
