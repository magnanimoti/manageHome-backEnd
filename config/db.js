mysql = require('mysql');
connectionString = 'mysql://root:josimar@localhost/manage_home';

db={};
db.cnn = {};
db.cnn.exec = function(query, callback){
	var connection = mysql.createConnection(connectionString);
	connection.query(query, function(err, rows){
		callback(rows, err);
		connection.end();
	});
};

module.exports = db;






