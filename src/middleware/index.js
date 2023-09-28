const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');

const swaggerDocument = YAML.load('./swagger.yaml');

const applyMiddleware = (app) => {
    app.use(express.json());
    app.use(express.text());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(morgan('dev'));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(
        OpenApiValidator.middleware({
            apiSpec: './swagger.yaml',
        })
    );
};

module.exports = applyMiddleware;
