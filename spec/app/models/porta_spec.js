var Porta = require('../../../app/models/porta');
var Controlador = require('../../../app/models/controlador');
var Dispositivo = require('../../../app/models/dispositivo');

describe("Modelo de Porta", function(){
	describe(" atributo", function(){
		it(" [id].",function(){
			var porta = new Porta();
			expect(porta.id).toBe(0);	
		});
		it(" [numero].",function(){
			var porta = new Porta();
			expect(porta.numero).toBe(undefined);
		});
		it(" [valor].",function(){
			var porta = new Porta();
			expect(porta.valor).toBe(undefined);
		});
		it(" [tipo].",function(){
			var porta = new Porta();
			expect(porta.tipo).toBe("");
		});
		it(" [modo].",function(){
			var porta = new Porta();
			expect(porta.modo).toBe("");
		});
		it(" [dispositivo].",function(){
			var porta = new Porta();
			expect(porta.dispositivo).toBe(undefined);
		});
		it(" [controlador].",function(){
			var porta = new Porta();
			expect(porta.controlador).toBe(undefined);
		});
		
	});

	describe(" metodo", function(){
		it(" [consultar ultimmo] na base de dados",function(done){
			Porta.consultarUltimo(function(retorno){
				//console.log(retorno.porta.id);
				//console.log(retorno.porta);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
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


		it(" [incluir] na base de dados",function(done){
			var porta = new Porta();
			porta.numero=10;
			porta.valor =255;
			porta.tipo="digital";
			porta.modo="entrada";
			porta.dispositivo=dispositivoId;
			porta.controlador =controladorId;
			porta.salvar(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		it(" [consultar] na base de dados",function(done){
			Porta.consultar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Porta.consultarUltimo(function(retorno){
				//console.log(retorno.porta.id);
				id = retorno.porta.id;
				done();
			});
		});
		it(" [consultar por id] na base de dados",function(done){
			Porta.consultarId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				expect(retorno.porta.id).toBe(id);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var portaNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Porta.consultarUltimo(function(retorno){
				//console.log(retorno.portas);
				portaNew = retorno.porta;
				done();
			});
		});
		it(" [atualizar] na base de dados",function(done){
			var porta = new Porta(portaNew);
			//console.log(portaNew);
			porta.numero=15;
			porta.tipo="analogica";
			porta.salvar(function(retorno){
			//	console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Porta.consultarUltimo(function(retorno){
				//console.log(retorno.porta.id);
				id = retorno.porta.id;
				done();
			});
		});
		it(" [excluir por id] na base de dados",function(done){
			Porta.excluirId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [excluir] na base dse dados",function(done){
			Porta.excluirTodos(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	
});
