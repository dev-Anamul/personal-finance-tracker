const dayOneYearAgo = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
};

const dayOneMonthAgo = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
};

const dayOneWeekAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
};

module.exports = {
    dayOneYearAgo,
    dayOneMonthAgo,
    dayOneWeekAgo,
};
