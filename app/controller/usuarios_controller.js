var Usuario = require('../models/usuario');	

var UsuariosController = {
	todos: function(request, response, next) {
		if(request.query.nome !== undefined){
			Usuario.buscarPorNome(request.query.nome, function(retorno){
				if(retorno.error){
					response.status(500).send({
						error: 'erro ao buscar usuario por nome (' + request.query.nome + ') - (' + retorno.message + ')'
					});
				}else{
					response.status(200).send(retorno.usuarios);
				}

			});
		}else{
			Usuario.todos(function(retorno){
				if(retorno.error){
					response.status(500).send({
						error: 'erro ao buscar usuarios (' + retorno.message + ')'
					});
				}else{
					response.status(200).send(retorno.usuarios);
				}

			});	
		}	
	},
	porId: function(request,response, next){
		Usuario.buscarPorId(request.params.id, function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar usuario por id (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.usuario);
			}
		});
	},
	criar: function(request,response, next){
		var usuario = new Usuario();
		usuario.nome=request.body.nome;
		usuario.email=request.body.email;
		usuario.senha=request.body.senha;
		usuario.login=request.body.login;
		usuario.salvar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao cadastrar usuario  (' + retorno.message + ')'
				});
			}else{
				response.status(201).send({mensagem: 'Usuario criado com sucesso'});
			}
		});
	},
	atualizar: function(request,response, next){
		Usuario.buscarPorId(request.body.id, function(retorno){
			if(retorno.usuario.id === undefined){
				response.status(400).send({
					error: 'erro ao atualizar, id de usuario não encontrado'
				});
			}else{
				var usuario = new Usuario();
				usuario.id = request.body.id;
				usuario.nome=request.body.nome;
				usuario.email=request.body.email;
				usuario.senha=request.body.senha;
				usuario.login=request.body.login;
				usuario.salvar(function(retorno){
					if(retorno.error){
						response.status(500).send({
							error: 'erro ao atualizar usuario  (' + retorno.message + ')'
						});
					}else{
						response.status(200).send({mensagem: 'Usuario atualizado com sucesso'});
					}
				});		
			}
		});
		
	}
};

module.exports = UsuariosController;