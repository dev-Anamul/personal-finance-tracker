const create = require('./create');
const findAll = require('./find-all');
const findOne = require('./find-one');
const expenseTrends = require('./expense-trends');
const incomeTrends = require('./income-trends');
const transactionStats = require('./transactions-stats');
const updatedTransactions = require('./update-put');
const removeTransaction = require('./remove');

// Todo: remove this
const bulkAdd = require('./bulk-add');

module.exports = {
    create,
    findAll,
    findOne,
    expenseTrends,
    incomeTrends,
    transactionStats,
    updatedTransactions,
    removeTransaction,

    // Todo: remove this
    bulkAdd,
};
