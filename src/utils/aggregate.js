const groupId = (frequency) => {
    switch (frequency) {
        case 'year':
            return {
                year: { $year: '$date' },
            };
        case 'month':
            return {
                year: { $year: '$date' },
                month: { $month: '$date' },
            };
        case 'week':
            return {
                year: { $year: '$date' },
                week: { $week: '$date' },
            };
        default:
            return {
                year: { $year: '$date' },
                month: { $month: '$date' },
            };
    }
};

const sortId = (frequency) => {
    switch (frequency) {
        case 'year':
            return {
                '_id.year': 1,
            };
        case 'month':
            return {
                '_id.year': 1,
                '_id.month': 1,
            };
        case 'week':
            return {
                '_id.year': 1,
                '_id.week': 1,
            };
        default:
            return {
                '_id.year': 1,
                '_id.month': 1,
            };
    }
};

const idFormate = (frequency) => {
    switch (frequency) {
        case 'year':
            return {
                year: '$_id.year',
            };
        case 'month':
            return {
                year: '$_id.year',
                month: '$_id.month',
            };
        case 'week':
            return {
                year: '$_id.year',
                week: '$_id.week',
            };
        default:
            return {
                year: '$_id.year',
                month: '$_id.month',
            };
    }
};

module.exports = {
    groupId,
    sortId,
    idFormate,
};
