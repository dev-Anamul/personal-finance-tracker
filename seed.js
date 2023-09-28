/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require('@faker-js/faker');

// exports.generateUser = () => {
//     const user = {
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         role: 'user',
//         avatar: faker.image.avatar(),
//     };

//     return user;
// };

// exports.generateBudget = () => {
//     const budget = {
//         name: faker.lorem.word(),
//         amount: faker.finance.amount(),
//         frequency: 'monthly',
//         user: faker.random.uuid(),
//     };

//     return budget;
// };

exports.generateTransaction = () => {
    const transaction = {
        title: faker.lorem.word(5),
        description: faker.lorem.sentence(3),
        amount: +faker.finance.amount(),
        date: faker.date.anytime(),
        type: faker.helpers.arrayElement(['income', 'expense']),
        categoryId: faker.helpers.arrayElement([
            '650c385ca3481c92cc61e11d',
            '650c3848a3481c92cc61e11a',
            '650c3838a3481c92cc61e117',
            '650c3825a3481c92cc61e114',
            '650c3813a3481c92cc61e111',
            '650be20e35c58e5c4c34d4bc',
        ]),
        userId: '650be1f435c58e5c4c34d4b9',
    };

    return transaction;
};
