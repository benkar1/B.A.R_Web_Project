/*
import required
 */
const mysql = require('mysql2');
const dbConfig = require('./dbConfig');

/*
create connection to database
 */
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

/*
open connection
 */
connection.connect( error => {
    if (error) {
        throw error;
    } else {
        console.log("successfully connected to DB");
    }
});

/*
export connection
 */
module.exports = connection;