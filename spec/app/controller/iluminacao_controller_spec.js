var Iluminacao = require('../../../app/models/iluminacao');
var Cena = require('../../../app/models/cena');
var Dispositivo = require('../../../app/models/dispositivo');
var request = require('request');

var host = "http://localhost:3000";


describe("Controle de iluminacoes", function(){
	
	describe(" POST /iluminacoes.json criar [iluminacao]", function(){
		var cenaId;
		var dispositivoId;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			var cena = new Cena({nome: "Mini", ip: "127.0.0.1"});
			cena.salvar(function(retornoCena){
				var dispositivo = new Dispositivo({nome: "inter", tipo: "unipolar"});
				dispositivo.salvar(function(retornoDispositivo){
					Cena.consultarUltimo(function(retornoCenaUltimo){
						cenaId = retornoCenaUltimo.cena.id;
						Dispositivo.consultarUltimo(function(retornoDispositivoUltimo){
							dispositivoId = retornoDispositivoUltimo.dispositivo.id;
							done();
						});
					});
				});

			});
		});
		it("returns status code 201 e  mensagem de [iluminacao] criado",function(done){
			request.post({url:host +"/iluminacoes.json",form: {nome: 'geral', estado: false,dispositivo: dispositivoId, cena: cenaId}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{

					expect(response.statusCode).toBe(201);

					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Iluminacao criado com sucesso");
				}	
				done();
			});
		});	
	});
	describe(" GET /iluminacoes.json retornar [todos]", function(){
		it("returns status code 200",function(done){
			request.get(host +"/iluminacoes.json", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					//console.log(body);
					expect(response.statusCode).toBe(200);
				}	
				done();
			});
		});	
	});

	describe(" GET /iluminacoes/porId.json retornar [por id]", function(){
		var iluminacaoNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Iluminacao.consultarUltimo(function(retorno){
				//console.log(retorno.iluminacao);
				iluminacaoNew = retorno.iluminacao;
				done();
			});
		});
		it("returns status code 200",function(done){
			var iluminacao = new Iluminacao(iluminacaoNew);
			request.get(host +"/iluminacoes/" + iluminacao.id + ".json", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					//console.log(body);
					expect(response.statusCode).toBe(200);
				}	
				done();
			});
		});	
	});
	describe(" PUT /iluminacoes.json atualizar [iluminacao]", function(){
		var iluminacaoNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Iluminacao.consultarUltimo(function(retorno){
				//console.log(retorno.iluminacao);
				iluminacaoNew = retorno.iluminacao;
				done();
			});
		});
		it("returns status code 200 e [iluminacao] atualizado",function(done){	
			//console.log(iluminacaoNew);
			var iluminacao = new Iluminacao(iluminacaoNew);
			iluminacao.id = iluminacaoNew.id;
			iluminacao.nome='diurno';
			iluminacao.estado=true;
			//	iluminacao.cena=iluminacaoNew.cena_id;
			//	iluminacao.dispositivo=iluminacaoNew.dispositivo_id;
			request.put({url:host +"/iluminacoes.json",form: iluminacao}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Iluminacao atualizado com sucesso");
					Iluminacao.consultarId(iluminacao.id, function(retorno){
						expect(retorno.iluminacao.nome).toBe('diurno');
						done();
					});
				}	
				done();
			});
		});
		it("returns status code 200 e [iluminacao] criado",function(done){	
			request.put({url:host +"/iluminacoes.json",form: {}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(400);
					done();
				}	
			});
		});
	});
});	