console.log("This is a test from application.js!");

exports.queryTest = function(req, res, next) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'nodemysql',
        user     : 'root',
        password : 'nodesecurity',
        database : 'nodesecurity'
    });
    
    connection.connect();

    query = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS"
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.log("Result: " + res);
    });
}