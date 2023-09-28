const budgetService = require('../../../../lib/budget');
const {
    generateHATEOAS,
    generatePagination,
    generateTransformItem,
} = require('../../../../utils/query');

const _default = require('../../../../config/default');

const findAll = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || _default.page;
    const limit = parseInt(req.query.limit, 10) || _default.limit;
    const order = req.query.order || _default.order;
    const sort = req.query.sort || _default.sort;
    const search = req.query.search || _default.search;

    const userId = req.user._id;

    try {
        const {
            data,
            limit: returnLimit,
            page: returnPage,
            totalItems,
        } = await budgetService.findAll({ page, limit, order, sort, search, userId });

        const transformedData = generateTransformItem({
            baseUrl: req.baseUrl,
            items: data,
            selection: [
                'id',
                'title',
                'description',
                'type',
                'date',
                'amount',
                'category',
                'createdAt',
                'updatedAt',
            ],
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

module.exports = findAll;
