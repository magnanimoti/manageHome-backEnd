var Controlador = require('../../../app/models/controlador');
var request = require('request');

var host = "http://localhost:3000";


describe("Controle de controladores", function(){
	
	describe(" POST /controladodres.json criar [controlador]", function(){
		it("returns status code 201 e  mensagem de [controlador] criado",function(done){
			request.post({url:host +"/controladores.json",form: {nome:'mini', ip: '192.168.0.3'}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{

					expect(response.statusCode).toBe(201);

					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Controlador criado com sucesso");
				}	
				done();
			});
		});	
	});
	describe(" GET /controladores.json retornar [todos]", function(){
		it("returns status code 200",function(done){
			request.get(host +"/controladores.json", function(error, response, body){
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

	describe(" GET /controladores/porId.json retornar [por id]", function(){
		var controladorNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Controlador.consultarUltimo(function(retorno){
				//console.log(retorno.controlador);
				controladorNew = retorno.controlador;
				done();
			});
		});
		it("returns status code 200",function(done){
			var controlador = new Controlador(controladorNew);
			request.get(host +"/controladores/" + controlador.id + ".json", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					console.log(body);
					expect(response.statusCode).toBe(200);
				}	
				done();
			});
		});	
	});
	describe(" PUT /controladores.json atualizar [controlador]", function(){
		var controladorNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Controlador.consultarUltimo(function(retorno){
				//console.log(retorno.controlador);
				controladorNew = retorno.controlador;
				done();
			});
		});
		it("returns status code 200 e [controlador] atualizado",function(done){	
			//console.log(controladorNew);
			var controlador = new Controlador(controladorNew);
			controlador.ip="192.168.0.200";
			controlador.nome="arduinos";
			//console.log(controlador);
			request.put({url:host +"/controladores.json",form: controlador}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Controlador atualizado com sucesso");
					Controlador.consultarId(controlador.id, function(retorno){
						expect(retorno.controlador.nome).toBe("arduinos");
						done();
					});
				}	
				done();
			});
		});
		it("returns status code 200 e [controlador] criado",function(done){	
			request.put({url:host +"/controladores.json",form: {}}, function(error, response, body){
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