const create = require('./create');
const findAll = require('./find-all');
const findOne = require('./find-single');
const remove = require('./remove');
const update = require('./update-put');
const updateProgress = require('./goal-progress');
const updateStatus = require('./update-status');

module.exports = {
    create,
    findAll,
    findOne,
    remove,
    update,
    updateProgress,
    updateStatus,
};
