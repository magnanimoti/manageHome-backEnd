var Controlador = require('../models/controlador');	

var ControladoresController = {
	todos: function(request, response, next) {
		Controlador.consultar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar controladores (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.controladores);
			}
		});		
	},
	porId: function(request,response, next){
		Controlador.consultarId(request.params.id, function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar controlador por id (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.controlador);
			}
		});
	},
	ultimo: function(request, response, next) {
		Controlador.consultarUltimo(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar ultimo controlador (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.controlador);
			}
		});		
	},
	criar: function(request,response, next){
		var controlador = new Controlador();
		controlador.nome=request.body.nome;
		controlador.ip=request.body.ip;
		
		controlador.salvar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao cadastrar controlador  (' + retorno.message + ')'
				});
			}else{
				response.status(201).send({mensagem: 'Controlador criado com sucesso'});
			}
		});
	},
	atualizar: function(request,response, next){
		///console.log(request.body);
		Controlador.consultarId(request.body.id, function(retorno){
			if(retorno.controlador.id === undefined){
				response.status(400).send({
					error: 'erro ao atualizar, id de controlador não encontrado'
				});
			}else{
				var controlador = new Controlador();
				controlador.id = request.body.id;
				controlador.nome=request.body.nome;
				controlador.ip=request.body.ip;
				controlador.salvar(function(retorno){
					if(retorno.error){
						response.status(500).send({
							error: 'erro ao atualizar controlador  (' + retorno.message + ')'
						});
					}else{
						response.status(200).send({mensagem: 'Controlador atualizado com sucesso'});
					}
				});		
			}
		});
		
	}
};

module.exports = ControladoresController;