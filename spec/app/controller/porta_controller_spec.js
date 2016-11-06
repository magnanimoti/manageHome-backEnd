var Porta = require('../../../app/models/porta');
var Controlador = require('../../../app/models/controlador');
var Dispositivo = require('../../../app/models/dispositivo');
var request = require('request');

var host = "http://localhost:3000";


describe("Controle de portas", function(){
	
	describe(" POST /portas.json criar [porta]", function(){
		var controladorId;
		var dispositivoId;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			var controlador = new Controlador({nome: "Mini", ip: "127.0.0.1"});
			controlador.salvar(function(retornoControlador){
				var dispositivo = new Dispositivo({nome: "inter", tipo: "unipolar"});
				dispositivo.salvar(function(retornoDispositivo){
					Controlador.consultarUltimo(function(retornoControladorUltimo){
						controladorId = retornoControladorUltimo.controlador.id;
						Dispositivo.consultarUltimo(function(retornoDispositivoUltimo){
							dispositivoId = retornoDispositivoUltimo.dispositivo.id;
							done();
						});
					});
				});

			});
		});
		it("returns status code 201 e  mensagem de [porta] criado",function(done){
			request.post({url:host +"/portas.json",form: {numero: 10, valor: 255, tipo: 'digital', modo: 'entrada',dispositivo: dispositivoId, controlador: controladorId}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{

					expect(response.statusCode).toBe(201);

					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Porta criado com sucesso");
				}	
				done();
			});
		});	
	});
	describe(" GET /portas.json retornar [todos]", function(){
		it("returns status code 200",function(done){
			request.get(host +"/portas.json", function(error, response, body){
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

	describe(" GET /portas/porId.json retornar [por id]", function(){
		var portaNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Porta.consultarUltimo(function(retorno){
				//console.log(retorno.porta);
				portaNew = retorno.porta;
				done();
			});
		});
		it("returns status code 200",function(done){
			var porta = new Porta(portaNew);
			request.get(host +"/portas/" + porta.id + ".json", function(error, response, body){
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
	describe(" PUT /portas.json atualizar [porta]", function(){
		var portaNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Porta.consultarUltimo(function(retorno){
				//console.log(retorno.porta);
				portaNew = retorno.porta;
				done();
			});
		});
		it("returns status code 200 e [porta] atualizado",function(done){	
			//console.log(portaNew);
			var porta = new Porta(portaNew);
			porta.id = portaNew.id;
			porta.numero=15;
			porta.valor=200;
			//porta.modo=request.body.modo;
			porta.tipo='analog';
			//	porta.controlador=request.body.controlador;
			//	porta.dispositivo=request.body.dispositivo;
			request.put({url:host +"/portas.json",form: porta}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Porta atualizado com sucesso");
					Porta.consultarId(porta.id, function(retorno){
						expect(retorno.porta.numero).toBe(15);
						done();
					});
				}	
				done();
			});
		});
		it("returns status code 200 e [porta] criado",function(done){	
			request.put({url:host +"/portas.json",form: {}}, function(error, response, body){
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