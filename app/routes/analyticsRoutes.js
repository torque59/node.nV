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

    query = "SELECT * FROM analytics";
    connection.query(query, function(err,response) {
        if (err) throw err;
        console.log("Result: " + response);
        res.json(response);
    });
}