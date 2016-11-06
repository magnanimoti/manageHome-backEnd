var Iluminacao = require('../models/iluminacao');	

var IluminacoesController = {
	todos: function(request, response, next) {
		Iluminacao.consultar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar iluminacoes (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.iluminacoes);
			}
		});		
	},
	porId: function(request,response, next){
		Iluminacao.consultarId(request.params.id, function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar iluminacao por id (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.iluminacao);
			}
		});
	},
	ultimo: function(request, response, next) {
		Iluminacao.consultarUltimo(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao buscar ultimo iluminacao (' + retorno.message + ')'
				});
			}else{
				response.status(200).send(retorno.iluminacao);
			}
		});		
	},
	criar: function(request,response, next){
		var iluminacao = new Iluminacao();
		iluminacao.nome=request.body.nome;
		iluminacao.estado=request.body.estado;
		iluminacao.cena=request.body.cena;
		iluminacao.dispositivo=request.body.dispositivo;
		
		iluminacao.salvar(function(retorno){
			if(retorno.error){
				response.status(500).send({
					error: 'erro ao cadastrar iluminacao  (' + retorno.message + ')'
				});
			}else{
				response.status(201).send({mensagem: 'Iluminacao criado com sucesso'});
			}
		});
	},
	atualizar: function(request,response, next){
		console.log(request.body);
		Iluminacao.consultarId(request.body.id, function(retorno){
			if(retorno.iluminacao.id === undefined){
				response.status(400).send({
					error: 'erro ao atualizar, id de iluminacao não encontrado'
				});
			}else{
				var iluminacao = new Iluminacao();
				iluminacao.id = request.body.id;
				iluminacao.nome=request.body.nome;
				iluminacao.estado=request.body.estado;
				iluminacao.cena=request.body.cena;
				iluminacao.dispositivo=request.body.dispositivo;
				iluminacao.salvar(function(retorno){
					if(retorno.error){
						response.status(500).send({
							error: 'erro ao atualizar iluminacao  (' + retorno.message + ')'
						});
					}else{
						response.status(200).send({mensagem: 'Iluminacao atualizado com sucesso'});
					}
				});		
			}
		});
		
	}
};

module.exports = IluminacoesController;