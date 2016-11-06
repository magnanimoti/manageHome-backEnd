var Dispositivo = require('../../../app/models/dispositivo');
var request = require('request');

var host = "http://localhost:3000";


describe("Controle de dispositivos", function(){
	
	describe(" POST /dispositivos.json criar [dispositivo]", function(){
		it("returns status code 201 e  mensagem de [dispositivo] criado",function(done){
			request.post({url:host +"/dispositivos.json",form: {nome:'inter', tipo: 'unipolar'}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{

					expect(response.statusCode).toBe(201);

					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Dispositivo criado com sucesso");
				}	
				done();
			});
		});	
	});
	describe(" GET /dispositivos.json retornar [todos]", function(){
		it("returns status code 200",function(done){
			request.get(host +"/dispositivos.json", function(error, response, body){
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

	describe(" GET /dispositivos/porId.json retornar [por id]", function(){
		var dispositivoNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Dispositivo.consultarUltimo(function(retorno){
				//console.log(retorno.dispositivo);
				dispositivoNew = retorno.dispositivo;
				done();
			});
		});
		it("returns status code 200",function(done){
			var dispositivo = new Dispositivo(dispositivoNew);
			request.get(host +"/dispositivos/" + dispositivo.id + ".json", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
				//	console.log(body);
					expect(response.statusCode).toBe(200);
				}	
				done();
			});
		});	
	});
	describe(" PUT /dispositivos.json atualizar [dispositivo]", function(){
		var dispositivoNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Dispositivo.consultarUltimo(function(retorno){
				//console.log(retorno.dispositivo);
				dispositivoNew = retorno.dispositivo;
				done();
			});
		});
		it("returns status code 200 e [dispositivo] atualizado",function(done){	
			//console.log(dispositivoNew);
			var dispositivo = new Dispositivo(dispositivoNew);
			dispositivo.tipo="bipolar";
			dispositivo.nome="cental";
			//console.log(dispositivo);
			request.put({url:host +"/dispositivos.json",form: dispositivo}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Dispositivo atualizado com sucesso");
					Dispositivo.consultarId(dispositivo.id, function(retorno){
						expect(retorno.dispositivo.nome).toBe("cental");
						done();
					});
				}	
				done();
			});
		});
		it("returns status code 200 e [dispositivo] criado",function(done){	
			request.put({url:host +"/dispositivos.json",form: {}}, function(error, response, body){
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