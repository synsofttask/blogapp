require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.error("Failed to connect:", err.message);
    } else {
        console.log("Database connection successful!");
    }
});

module.exports = connection;


