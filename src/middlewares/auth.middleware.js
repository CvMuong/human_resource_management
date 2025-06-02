const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { createError } = require('../utils/error');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createError('No token provided!'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded =  jwt.verify(token, config.jwtsecret);
        req.user = decoded;
        next();
    } catch (err) {
        if (config.nodeenv === 'development') console.error(err);
        
        let message = 'Authentication failed!';
        if (err.name === 'TokenExpiredError') message = 'Expired token';
        if (err.name === 'JsonWebTokenError') message = 'Invalid token!';
        if (err.name === 'NotBeforeError') message = 'Token not active yet!';

        return next(createError(message, 401));
    }
}

module.exports = { protect };