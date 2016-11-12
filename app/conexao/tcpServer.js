var net = require('net');

var TcpServer = function(){
	var server = net.createServer();
	server.listen(9090, function() {  
	 	console.log('server listening to %j', server.address());
	});	
	server.on('connection', handleConnection);

 	function handleConnection(conn) {  
	   //console.log(conn);
	   var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
   		console.log('new client connection from %s', remoteAddress);

   		conn.on('data', onConnData);
   		conn.once('close', onConnClose);
   		conn.on('error', onConnError);
   	
	   	function onConnData(d) {
	    	console.log('connection data from %s: %j', remoteAddress, d);
	     	console.log(d.toString());
	     	conn.write(d);
	   	}

	   	function onConnClose() {
	    	console.log('connection from %s closed', remoteAddress);
	   	}

	   	function onConnError(err) {
	    	console.log('Connection %s error: %s', remoteAddress, err.message);
	   	}
   	}
 
};
module.exports = TcpServer;