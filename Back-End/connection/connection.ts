import mysql from "mysql2/promise"
require("dotenv").config();

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
})


export default { connection };
