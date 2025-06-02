const express = require('express');
const app = express();
const config = require('./config/env');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/user,route');

connectDB();

if (config.nodeenv === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(userRoutes);

app.use(errorHandler);

module.exports = app;