mysql = require('mysql');
connectionString = 'mysql://app:app127001@localhost/managedb';
//connectionString = 'mysql://josimarmysql:josimar123@localhost/managedb';

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






