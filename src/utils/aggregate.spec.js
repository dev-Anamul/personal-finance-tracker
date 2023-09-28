/* eslint-disable no-undef */
const { groupId, idFormate, sortId } = require('./aggregate');

describe('aggregate', () => {
    describe('groupId', () => {
        it('should return a group id for year', () => {
            const frequency = 'year';

            const result = groupId(frequency);

            expect(result).toEqual({
                year: { $year: '$date' },
            });
        });

        it('should return a group id for month', () => {
            const frequency = 'month';

            const result = groupId(frequency);

            expect(result).toEqual({
                year: { $year: '$date' },
                month: { $month: '$date' },
            });
        });

        it('should return a group id for week', () => {
            const frequency = 'week';

            const result = groupId(frequency);

            expect(result).toEqual({
                year: { $year: '$date' },
                week: { $week: '$date' },
            });
        });

        it('should return a group id for default', () => {
            const frequency = '';

            const result = groupId(frequency);

            expect(result).toEqual({
                year: { $year: '$date' },
                month: { $month: '$date' },
            });
        });
    });

    describe('sortId', () => {
        it('should return a sort id for year', () => {
            const frequency = 'year';

            const result = sortId(frequency);

            expect(result).toEqual({
                '_id.year': 1,
            });
        });

        it('should return a sort id for month', () => {
            const frequency = 'month';

            const result = sortId(frequency);

            expect(result).toEqual({
                '_id.year': 1,
                '_id.month': 1,
            });
        });

        it('should return a sort id for week', () => {
            const frequency = 'week';

            const result = sortId(frequency);

            expect(result).toEqual({
                '_id.year': 1,
                '_id.week': 1,
            });
        });

        it('should return a sort id for default', () => {
            const frequency = '';

            const result = sortId(frequency);

            expect(result).toEqual({
                '_id.year': 1,
                '_id.month': 1,
            });
        });
    });

    describe('idFormate', () => {
        it('should return an id formate for year', () => {
            const frequency = 'year';

            const result = idFormate(frequency);

            expect(result).toEqual({
                year: '$_id.year',
            });
        });

        it('should return an id formate for month', () => {
            const frequency = 'month';

            const result = idFormate(frequency);

            expect(result).toEqual({
                year: '$_id.year',
                month: '$_id.month',
            });
        });

        it('should return an id formate for week', () => {
            const frequency = 'week';

            const result = idFormate(frequency);

            expect(result).toEqual({
                year: '$_id.year',
                week: '$_id.week',
            });
        });

        it('should return an id formate for default', () => {
            const frequency = '';

            const result = idFormate(frequency);

            expect(result).toEqual({
                year: '$_id.year',
                month: '$_id.month',
            });
        });
    });
});
