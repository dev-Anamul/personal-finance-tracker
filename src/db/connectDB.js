const mongoose = require('mongoose');

// connection string
let connectionString = process.env.MONGO_CONNECTION_STRING;
connectionString = connectionString.replace('<USERNAME>', process.env.MONGO_USERNAME);
connectionString = connectionString.replace('<PASSWORD>', process.env.MONGO_PASSWORD);
connectionString = connectionString.replace('<HOST>', process.env.MONGO_HOST);
connectionString = connectionString.replace('<PORT>', process.env.MONGO_PORT);

// connect to mongodb
const connectDB = async () => {
    await mongoose.connect(connectionString, {
        dbName: process.env.MONGO_DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin',
    });
    console.log('Connected to MongoDB');
};

module.exports = connectDB;
