/* eslint-disable no-undef */
const { dayOneMonthAgo, dayOneWeekAgo, dayOneYearAgo } = require('./date');

describe('dayOneYearAgo', () => {
    it('should return a date one year ago', () => {
        const result = dayOneYearAgo();
        const date = new Date();

        expect(result.getFullYear()).toEqual(date.getFullYear() - 1);
    });
});

describe('dayOneMonthAgo', () => {
    it('should return a date one month ago', () => {
        const result = dayOneMonthAgo();
        const date = new Date();

        expect(result.getMonth()).toEqual(date.getMonth() - 1);
    });
});

describe('dayOneWeekAgo', () => {
    it('should return a date one week ago', () => {
        const result = dayOneWeekAgo();
        const date = new Date();

        expect(result.getDate()).toEqual(date.getDate() - 7);
    });
});
