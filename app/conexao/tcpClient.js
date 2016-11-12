var net = require('net');
var connections=[];


connections.forEach(function(connecton){
	connecton.on('data', function(data) {
		console.log('Received: ' + data);
		//connecton.destroy(); // kill connecton after server's response
	});

	connecton.on('close', function() {
		console.log('Connection closed');
		//connecton.destroy();
	});

	connecton.on('error', function(err) {
		  console.log('server error: '+ err);
	});
});

var TcpClient = function(host){
	var client = new net.Socket();
	client.on('connect', function() {
		console.log('Connected');
		client.write('Control1');
		connections.push(client);
		//client.destroy();
		//console.log(client);
	});
	this.conectar = function(){
		client.connect(host);	
	};
};
module.exports = TcpClient;