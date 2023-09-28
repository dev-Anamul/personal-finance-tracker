const _default = require('../../../../config/default');
const transactionService = require('../../../../lib/transaction');
const {
    generateTransformItem,
    generatePagination,
    generateHATEOAS,
} = require('../../../../utils/query');

const getTransactions = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || _default.page;
    const limit = parseInt(req.query.limit, 10) || _default.limit;
    const order = req.query.order || _default.order;
    const sort = req.query.sort || _default.sort;
    const search = req.query.search || _default.search;
    const expand = req.query.expand || _default.expand;
    const select = req.query.select || _default.select;
    const userId = req.user.id;

    try {
        const {
            data,
            limit: returnLimit,
            page: returnPage,
            totalItems,
        } = await transactionService.findAll({
            limit,
            page,
            order,
            sort,
            search,
            expand,
            userId,
        });

        // convert select to selection array
        const selection = select ? select.split(',') : [];
        const transformedData = generateTransformItem({
            baseUrl: req.baseUrl,
            items: data,
            selection: ['id', 'title', 'description', 'createdAt', 'updatedAt', ...selection],
        });

        const pagination = generatePagination({ limit: returnLimit, page: returnPage, totalItems });

        const links = generateHATEOAS({
            baseUrl: req.baseUrl,
            page: returnPage,
            limit: returnLimit,
            query: req.query,
            ...pagination,
        });

        return res.status(200).json({
            code: 200,
            status: 'success',
            data: transformedData,
            pagination,
            links,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = getTransactions;
