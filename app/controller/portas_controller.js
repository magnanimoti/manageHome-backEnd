var Porta = require('../models/porta');	

var PortasController = {
	todos: function(request, response, next) {
		Porta.consultar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar portas (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.portas);
			}
		});		
	},
	porId: function(request,response, next){
		Porta.consultarId(request.params.id, function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar porta por id (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.porta);
			}
		});
	},
	ultimo: function(request, response, next) {
		Porta.consultarUltimo(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar ultimo porta (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.porta);
			}
		});		
	},
	criar: function(request,response, next){
		var porta = new Porta();
		porta.numero=request.body.numero;
		porta.valor=request.body.valor;
		porta.modo=request.body.modo;
		porta.tipo=request.body.tipo;
		porta.controlador=request.body.controlador;
		porta.dispositivo=request.body.dispositivo;
		
		porta.salvar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao cadastrar porta  (' + retorno.message + ')'
				});
			}else{
				response.status(201).send({mensagem: 'Porta criado com sucesso'});
			}
		});
	},
	atualizar: function(request,response, next){
		console.log(request.body);
		Porta.consultarId(request.body.id, function(retorno){
			if(retorno.porta.id === undefined){
				response.status(400).send({
					error: 'erro ao atualizar, id de porta não encontrado'
				});
			}else{
				var porta = new Porta();
				porta.id = request.body.id;
				porta.numero=request.body.numero;
				porta.valor=request.body.valor;
				porta.modo=request.body.modo;
				porta.tipo=request.body.tipo;
				porta.controlador=request.body.controlador;
				porta.dispositivo=request.body.dispositivo;
				porta.salvar(function(retorno){
					if(retorno.error){
						response.status(500).send({
							error: 'erro ao atualizar porta  (' + retorno.message + ')'
						});
					}else{
						response.status(200).send({mensagem: 'Porta atualizado com sucesso'});
					}
				});		
			}
		});
		
	}
};

module.exports = PortasController;