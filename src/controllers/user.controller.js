const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { createError } = require('../utils/error');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(createError('Email already in use', 400));
        const user = await User.create({ name, email, password, role });
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            config.jwtsecret, 
            { expiresIn: '1d'}
        );
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            expiresIn: '1d'
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return next(createError('Invalid email or password', 400));
        }
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            config.jwtsecret, 
            { expiresIn: '1d'}
        );
        res.status(200).json({
            success: true,
            message: 'Login successfully',
            token,
            expiresIn: '1d'
        });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return next(createError('User not found', 404));
        res.status(200).json({
            success: true,
            message: 'Fetched user profile successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').lean();
        if (users.length === 0 ) return next(createError('No users found', 404));
        res.status(200).json({
            success: true,
            message: 'User list retrieved successfully',
            data: users
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return next(createError('User not found', 404));
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        next(error)
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) return next(createError('User not found', 404));

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return next(createError('User not found', 404));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}