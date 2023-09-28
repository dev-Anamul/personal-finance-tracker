/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
const AppError = require('../utils/appError');

// mongoose errors
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

// mongoose errors
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// jwt errors (invalid token)
const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

// jwt errors (token expired)
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

const sendErrorProd = (err, req, res) => {
    // our created errors
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    console.error('ERROR 💥', err);

    // unknown errors
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};

// main error handler
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, _next) => {
    // console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };
    error.message = err.message;

    // mongoose bad object id
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    // mongoose duplicate key
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    // mongoose validation error
    if (error.name === 'ValidationError') {
        error = handleValidationErrorDB(error);
    }

    // jwt errors (invalid token)
    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    // jwt errors (token expired)
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
};
