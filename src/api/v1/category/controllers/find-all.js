/* eslint-disable no-underscore-dangle */
const _default = require('../../../../config/default');
const categoryService = require('../../../../lib/category');
const {
    generateTransformItem,
    generatePagination,
    generateHATEOAS,
} = require('../../../../utils/query');

const getCategories = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || _default.page;
    const limit = parseInt(req.query.limit, 10) || _default.limit;
    const order = req.query.order || _default.order;
    const sort = req.query.sort || _default.sort;
    const search = req.query.search || _default.search;
    const userId = req.user.id;

    try {
        const {
            data,
            limit: returnLimit,
            page: returnPage,
            totalItems,
        } = await categoryService.findAll({
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
            selection: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
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

module.exports = getCategories;
