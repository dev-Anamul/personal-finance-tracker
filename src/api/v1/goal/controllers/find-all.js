const goalService = require('../../../../lib/goal');
const {
    generateTransformItem,
    generatePagination,
    generateHATEOAS,
} = require('../../../../utils/query');

const findAll = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const order = req.query.order || 'desc';
    const sort = req.query.sort || 'createdAt';
    const search = req.query.search || '';
    const userId = req.user.id;

    try {
        const {
            data,
            limit: returnLimit,
            page: returnPage,
            totalItems,
        } = await goalService.findAll({
            limit,
            page,
            order,
            sort,
            search,
            userId,
        });

        const transformedData = generateTransformItem({
            baseUrl: req.baseUrl,
            items: data,
            selection: [
                'id',
                'title',
                'description',
                'targetAmount',
                'currentProgress',
                'status',
                'targetDate',
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
