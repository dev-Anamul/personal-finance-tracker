const express = require('express');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
const { controller } = require('./api/v1/transactions');

// create app
const app = express();

// apply middleware
applyMiddleware(app);

// use routes
app.use('/api', routes);
app.get('/bulk-add', controller.bulkAdd);

// health check
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK' });
});

// not found route
app.get('*', (req, res) => {
    const url = `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl}`;
    res.status(404).send(`The requested resource '${url}' does not exist`);
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(err);
    }
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
        err,
    });
});
// export app
module.exports = app;
