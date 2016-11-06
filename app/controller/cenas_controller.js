var Cena = require('../models/cena');	

var CenasController = {
	todos: function(request, response, next) {
		Cena.consultar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar cenas (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.cenas);
			}
		});		
	},
	porId: function(request,response, next){
		Cena.consultarId(request.params.id, function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar cena por id (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.cena);
			}
		});
	},
	criar: function(request,response, next){
		var cena = new Cena();
		cena.nome=request.body.nome;
		cena.estado=request.body.estado;
		
		cena.salvar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao cadastrar cena  (' + retorno.message + ')'
				});
			}else{
				response.status(201).send({mensagem: 'Cena criado com sucesso'});
			}
		});
	},
	atualizar: function(request,response, next){
		///console.log(request.body);
		Cena.consultarId(request.body.id, function(retorno){
			if(retorno.cena.id === undefined){
				response.status(400).send({
					error: 'erro ao atualizar, id de cena não encontrado'
				});
			}else{
				var cena = new Cena();
				cena.id = request.body.id;
				cena.nome=request.body.nome;
				cena.estado=request.body.estado;
				cena.salvar(function(retorno){
					if(retorno.error){
						response.status(500).send({
							error: 'erro ao atualizar cena  (' + retorno.message + ')'
						});
					}else{
						response.status(200).send({mensagem: 'Cena atualizado com sucesso'});
					}
				});		
			}
		});
		
	}
};

module.exports = CenasController;