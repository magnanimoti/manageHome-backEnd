var Cena = require('../../../app/models/cena');
var request = require('request');

var host = "http://localhost:3000";


describe("Controle de cenas", function(){
	
	describe(" POST /cenas.json criar [cena]", function(){
		it("returns status code 201 e  mensagem de [cena] criado",function(done){
			request.post({url:host +"/cenas.json",form: {nome:'cozinha', estado: false}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{

					expect(response.statusCode).toBe(201);

					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Cena criado com sucesso");
				}	
				done();
			});
		});	
	});
	describe(" GET /cenas.json retornar [todos]", function(){
		it("returns status code 200",function(done){
			request.get(host +"/cenas.json", function(error, response, body){
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

	describe(" GET /cenas/porId.json retornar [por id]", function(){
		var cenaNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Cena.consultarUltimo(function(retorno){
				//console.log(retorno.cena);
				cenaNew = retorno.cena;
				done();
			});
		});
		it("returns status code 200",function(done){
			var cena = new Cena(cenaNew);
			request.get(host +"/cenas/" + cena.id + ".json", function(error, response, body){
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
	describe(" PUT /cenas.json atualizar [cena]", function(){
		var cenaNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Cena.consultarUltimo(function(retorno){
				//console.log(retorno.cena);
				cenaNew = retorno.cena;
				done();
			});
		});
		it("returns status code 200 e [cena] atualizado",function(done){	
			//console.log(cenaNew);
			var cena = new Cena(cenaNew);
			cena.estado=true;
			cena.nome="cozinha1";
			//console.log(cena);
			request.put({url:host +"/cenas.json",form: cena}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Cena atualizado com sucesso");
					Cena.consultarId(cena.id, function(retorno){
						expect(retorno.cena.nome).toBe("cozinha1");
						done();
					});
				}	
				done();
			});
		});
		it("returns status code 200 e [cena] criado",function(done){	
			request.put({url:host +"/cenas.json",form: {}}, function(error, response, body){
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