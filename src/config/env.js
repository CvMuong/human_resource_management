require('dotenv').config();

const env = {
    port: process.env.PORT || 3000,
    nodeenv: process.env.NODE_ENV || 'development',
    mongouri: process.env.MONGO_URI,
    jwtsecret: process.env.JWT_SECRET,
};

module.exports = env;