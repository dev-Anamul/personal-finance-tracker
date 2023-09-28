/* eslint-disable import/no-unresolved */
const create = require('./create');
const findAll = require('./find-all');
const findOneById = require('./find-one');
const removeOneById = require('./remove');
const updateOne = require('./update-patch');

module.exports = {
    create,
    findAll,
    findOneById,
    removeOneById,
    updateOne,
};
