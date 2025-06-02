const mongoose = require('mongoose');
const config = require('./env');

async function connectDB() {
    try {
        await mongoose.connect(config.mongouri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;