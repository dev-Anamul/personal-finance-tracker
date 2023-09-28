/* eslint-disable no-underscore-dangle */
const _default = require('../config/default');
const { generateQueryString } = require('./qs');

const generatePagination = ({
    totalItems = _default.totalItems || 0,
    limit = _default.limit,
    page = _default.page,
}) => {
    const totalPages = Math.ceil(totalItems / limit) || 1;

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    const offset = (page - 1) * limit;

    return {
        limit,
        page,
        totalPages,
        totalItems,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        offset,
    };
};

const generateHATEOAS = ({
    query = {},
    page = _default.page,
    limit = _default.limit,
    totalPages = _default.totalPages,
    hasNextPage = false,
    hasPrevPage = false,
    nextPage,
    prevPage,
    baseUrl,
}) => {
    const firstPage = `${baseUrl}?page=1&limit=${limit}`;
    const lastPage = `${baseUrl}?page=${totalPages}&limit=${limit}`;

    const prevPageUrl = hasPrevPage
        ? `${baseUrl}?${generateQueryString({ ...query, page: prevPage })}`
        : null;

    const nextPageUrl = hasNextPage
        ? `${baseUrl}?${generateQueryString({ ...query, page: nextPage })}`
        : null;

    const links = {
        self: `${baseUrl}?page=${page}&limit=${limit}`,
        firstPage,
        lastPage,
        prevPageUrl,
        nextPageUrl,
    };

    return links;
};
const generateTransformItem = ({ items = [], baseUrl = '/', selection = [] }) => {
    if (!Array.isArray(items) || !Array.isArray(selection)) {
        throw new Error('items and selection must be an array');
    }

    if (selection.length === 0) {
        return items.map((item) => ({
            ...item,
            links: {
                self: `${baseUrl}/${item.id}`,
            },
        }));
    }

    const transformItems = items.map((item) => {
        const transformedItem = {};
        selection.forEach((field) => {
            transformedItem[field] = item[field];
        });
        transformedItem.links = {
            self: `${baseUrl}/${item.id}`,
        };
        return transformedItem;
    });
    return transformItems;
};

module.exports = {
    generatePagination,
    generateHATEOAS,
    generateTransformItem,
};
