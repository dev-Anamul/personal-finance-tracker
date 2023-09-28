const findAll = require('./find-all');
const findOne = require('./find-single');
const create = require('./create');
const update = require('./update-put');
const remove = require('./remove');
const updateProgress = require('./update-progress');
const updateStatus = require('./update-status');
// const getProgress = require('./get-progress');
// const status = require('./status');

module.exports = {
    findAll,
    findOne,
    create,
    update,
    remove,
    updateProgress,
    updateStatus,
};
