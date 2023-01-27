// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    SECRET: process.env.SECRET,
    HEADER_AUTH: process.env.HEADER_AUTH,
    SYS_ADMIN_USERNAME:process.env.SYS_ADMIN_USERNAME,
    SYS_ADMIN_PASSWORD:process.env.SYS_ADMIN_PASSWORD,
};