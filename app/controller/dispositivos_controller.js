var Dispositivo = require('../models/dispositivo');	

var DispositivosController = {
	todos: function(request, response, next) {
		Dispositivo.consultar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar dispositivos (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.dispositivos);
			}
		});		
	},
	porId: function(request,response, next){
		Dispositivo.consultarId(request.params.id, function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar dispositivo por id (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.dispositivo);
			}
		});
	},
	criar: function(request,response, next){
		var dispositivo = new Dispositivo();
		dispositivo.nome=request.body.nome;
		dispositivo.tipo=request.body.tipo;
		
		dispositivo.salvar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao cadastrar dispositivo  (' + retorno.message + ')'
				});
			}else{
				response.status(201).send({mensagem: 'Dispositivo criado com sucesso'});
			}
		});
	},
	atualizar: function(request,response, next){
		//console.log(request.body.id);
		Dispositivo.consultarId(request.body.id, function(retorno){
			if(retorno.dispositivo.id === undefined){
				response.status(400).send({
					error: 'erro ao atualizar, id de dispositivo não encontrado'
				});
			}else{
				var dispositivo = new Dispositivo();
				dispositivo.id = request.body.id;
				dispositivo.nome=request.body.nome;
				dispositivo.tipo=request.body.tipo;
				dispositivo.salvar(function(retorno){
					if(retorno.error){
						response.status(500).send({
							error: 'erro ao atualizar dispositivo  (' + retorno.message + ')'
						});
					}else{
						response.status(200).send({mensagem: 'Dispositivo atualizado com sucesso'});
					}
				});		
			}
		});
		
	}
};

module.exports = DispositivosController;