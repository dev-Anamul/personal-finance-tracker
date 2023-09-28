require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./db');

// create server
const server = http.createServer(app);

// define port
const port = process.env.PORT || 8090;

// main function
const main = async () => {
    try {
        await connectDB();
        server.listen(port, () => {
            console.log(`:>Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log('Database error');
        console.log(error);
    }
};

main();
