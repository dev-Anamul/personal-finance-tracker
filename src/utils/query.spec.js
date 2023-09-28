/* eslint-disable no-undef */

const { generateHATEOAS, generatePagination, generateTransformItem } = require('./query');

jest.mock('../config/default', () => ({
    limit: 10,
    page: 1,
    totalItems: 0,
}));

describe(' generatePagination ', () => {
    it(' should return default pagination ', () => {
        const pagination = generatePagination({});

        expect(pagination).toEqual({
            limit: 10,
            page: 1,
            totalPages: 1,
            totalItems: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
            offset: 0,
        });
    });

    it(' should return pagination ', () => {
        const pagination = generatePagination({
            totalItems: 100,
            limit: 10,
            page: 1,
        });
        expect(pagination).toEqual({
            limit: 10,
            page: 1,
            totalPages: 10,
            totalItems: 100,
            hasPrevPage: false,
            hasNextPage: true,
            prevPage: null,
            nextPage: 2,
            offset: 0,
        });
    });
});

describe('generate HATEOAS', () => {
    it('should return HATEOAS', () => {
        const hateoas = generateHATEOAS({
            baseUrl: 'http://localhost:3000/api/v1/users',
            query: {},
            page: 1,
            limit: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
            nextPage: null,
            prevPage: null,
        });
        expect(hateoas).toEqual({
            self: 'http://localhost:3000/api/v1/users?page=1&limit=10',
            firstPage: 'http://localhost:3000/api/v1/users?page=1&limit=10',
            lastPage: 'http://localhost:3000/api/v1/users?page=1&limit=10',
            prevPageUrl: null,
            nextPageUrl: null,
        });
    });
});

describe('generate transform items', () => {
    it('should throw error if data is not an array', () => {
        expect(() => generateTransformItem({ items: {} })).toThrowError();
    });

    it('should add link property if selection length 0', () => {
        const transformItem = generateTransformItem({
            items: [{ id: '2234', title: 'hello' }],
            baseUrl: '/v1/users',
            selection: [],
        });

        expect(transformItem[0].links).toBeDefined();
        expect(transformItem[0].links.self).toBeDefined();
        expect(transformItem[0].links.self).toEqual('/v1/users/2234');
    });
});
