const getCategories = require('./find-all');
const createCategory = require('./create');
const findSingle = require('./find-single');
const remove = require('./remove');
const updatePut = require('./update-put');

module.exports = {
    getCategories,
    createCategory,
    findSingle,
    remove,
    updatePut,
};
