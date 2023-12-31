const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

module.exports.setUp = async () => {
    mongo = await MongoMemoryServer.create();
    const url = mongo.getUri();
    await mongoose.connect(url, {
        useNewUrlParser: true,
    });
};

module.exports.dropDatabase = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
};

/**
 * Remove all the data for all db collections.
 */
module.exports.dropCollections = async () => {
    if (mongo) {
        const { collections } = mongoose.connection;
        await Promise.all(Object.keys(collections).map((key) => collections[key].deleteMany()));
    }
};
