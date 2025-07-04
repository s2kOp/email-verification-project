const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.ROOT_PASSWORD,
    database: "mulearn"
})

db.connect(err => {
    if(err) console.log(err);
    console.log("MySQL Connected");
})

module.exports = db;