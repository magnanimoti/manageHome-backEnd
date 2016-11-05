var Usuario = require('../models/usuario');	

var HomeController = {
	index: function(request, response, next) {
 	  response.render('index', { title: 'Express' });
	},
	usuario: function(request, response, next) {
	  var usuario = new Usuario();
	  usuario.id = 10;
	  usuario.nome = "ricardo6";
	  usuario.email = "jo@jo";
	  usuario.senha= "12A3";
	  usuario.login = "jo";
	  usuario.salvar();
	  console.log(usuario);
 	  response.send('Olá usuario');
	}
};

module.exports = HomeController;