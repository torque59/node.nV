console.log("This is a test from application.js!");

function mysqlConnect() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'nodemysql',
        user     : 'root',
        password : 'nodesecurity',
        database : 'nodesecurity'
    });
    
    connection.connect();
    
    return connection;
}

exports.allAnalytics = function(req, res, next) {

    mysqlConnection = mysqlConnect();

    query = "SELECT * FROM analytics";
    mysqlConnection.query(query, function(err,response) {
        if (err) throw err;
        res.json(response);
    });
}

exports.createAnalytic = function(req, res, next) {
    ip = req.connection.remoteAddress;
    page = req.body.page;
    ua = req.headers['user-agent'];

    mysqlConnection = mysqlConnect();

    /* FIX
    query = "INSERT INTO analytics (user_agent, ip_address, page_name, reg_date) VALUES (?, ?, ?, NOW())";
    mysqlConnection.query(query, [ua, ip, page], function(err,response) {
        if (err) {
            console.log("Error: " + err);
            throw err;
        }
        console.log("Query done.. sending response");
        res.json(response);
    });
    */
    
    query = "INSERT INTO analytics (user_agent, ip_address, page_name, reg_date) VALUES ('" + ua + "', '" + ip + "', '" + page + "', NOW())";
    mysqlConnection.query(query, function(err,response) {
        if (err) {
            console.log("Error: " + err);
            throw err;
        }
        console.log("Query done.. sending response");
        res.json(response);
    });
}