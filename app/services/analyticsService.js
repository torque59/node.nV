var mysql      = require('mysql');


console.log("This is a test from application.js!");

exports.queryTest = function(req, res, next) {
    var connection = mysql.createConnection({
        host     : 'nodemysql',
        user     : 'root',
        password : 'nodesecurity',
        database : 'nodesecurity'
    });
    
    connection.connect();

    query = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS"
    confirm.query(query, function(err,res) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}