var Controlador = require('../models/controlador');	

var TcpClient = require('./tcpClient');

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var UdpServer = function(){
	

	server.on('error', function(err){
	  console.log('server error:' + err.stack );
	  server.close();
	});

	server.on('message', function(msg, rinfo){
	  //console.log('server got: ' + msg + 'from ' + rinfo.address+ ' :' + rinfo.port);
 		msg = msg.toString();
 		if(msg ==='new'){
 			var controlador = new Controlador();
			controlador.nome="Control1";
			controlador.ip=rinfo.address;
			
			controlador.salvar(function(retorno){
				var tcpCli = new TcpClient({host: rinfo.address, port: 9090});
		 		tcpCli.conectar();	
				//console.log(retorno);
			});

 		}
 		//console.log(msg);
	});

	server.on('listening', function(){
	  var address = server.address();
	  console.log('server listening '+ address.address + ':' + address.port);
	});

	server.bind(9090);
};
module.exports = UdpServer;