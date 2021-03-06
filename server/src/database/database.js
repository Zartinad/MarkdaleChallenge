var mysql = require("mysql");
var util = require("util");

var pool = mysql.createPool({
    host   : 'remotemysql.com' ,
    connectionLimit: 1000,
    port     : 3306,
    user : 'zGolfTxQCI',
    password : 'v5ArG3JHi4',
    database : 'zGolfTxQCI',
    insecureAuth : true,
    timezone: ''
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query)

module.exports = pool;