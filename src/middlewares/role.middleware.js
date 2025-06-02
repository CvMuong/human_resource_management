const { createError } = require('../utils/error');

const authorize = (...roles) => (req, res,next) => {
    if(!req.user || !roles.includes(req.user.role)) {
        return next(createError('Forbidden', 403));
    }

    next();
}

module.exports = { authorize };