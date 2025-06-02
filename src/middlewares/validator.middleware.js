const { body } = require('express-validator');

exports.validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Role must be user or admin')
];

exports.validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6}).withMessage('Pass must be at least 6 characters long')
]