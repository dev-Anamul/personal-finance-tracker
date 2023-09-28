/* eslint-disable no-undef */
const { generateQueryString } = require('./qs');

describe('generateQueryString', () => {
    test('should return a query string', () => {
        const query = {
            page: 1,
            limit: 10,
        };

        const result = generateQueryString(query);

        expect(result).toEqual('page=1&limit=10');
    });
});
