const config = require('../config/env');

module.exports = (err, req, res, next) => {
    const message = err.message || 'Internal Server Error';
    const status = err.status || 500;

    if (config.nodeenv === 'development') {
        console.error('Detail error: ', err.stack);
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired',
        })
    }

    res.status(status).json({
        success: false,
        message,
        ...(config.nodeenv === 'development' ? { error: err.stack } : {})
    });
}