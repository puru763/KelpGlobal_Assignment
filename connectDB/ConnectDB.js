const { Client } = require('pg')
const dotenv = require("dotenv");
dotenv.config();

const DB_DATA = new Client({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})

module.exports = DB_DATA