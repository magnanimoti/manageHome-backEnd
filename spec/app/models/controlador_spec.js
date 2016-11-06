var Controlador = require('../../../app/models/controlador');

describe("Modelo de Controlador", function(){
	describe(" atributo", function(){
		it(" [id].",function(){
			var controlador = new Controlador();
			expect(controlador.id).toBe(0);	
		});
		it(" [nome].",function(){
			var controlador = new Controlador();
			expect(controlador.nome).toBe("");
		});
		it(" [ip].",function(){
			var controlador = new Controlador();
			expect(controlador.ip).toBe("");
		});
		
	});

	describe(" metodo", function(){
		it(" [consultar ultimmo] na base de dados",function(done){
			Controlador.consultarUltimo(function(retorno){
				//console.log(retorno.controlador.id);
				//console.log(retorno.controlador);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [incluir] na base de dados",function(done){
			var controlador = new Controlador();
			controlador.nome="arduinoUno";
			controlador.ip="192.168.0.155";
			controlador.salvar(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		it(" [consultar] na base de dados",function(done){
			Controlador.consultar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Controlador.consultarUltimo(function(retorno){
				//console.log(retorno.controlador.id);
				id = retorno.controlador.id;
				done();
			});
		});
		it(" [consultar por id] na base de dados",function(done){
			Controlador.consultarId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				expect(retorno.controlador.id).toBe(id);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var controladorNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Controlador.consultarUltimo(function(retorno){
		//		console.log(retorno.controlador);
				controladorNew = retorno.controlador;
				done();
			});
		});
		it(" [atualizar] na base de dados",function(done){
			var controlador = new Controlador(controladorNew);
			controlador.ip="192.168.0.200";
			controlador.nome="arduinos";
			controlador.salvar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Controlador.consultarUltimo(function(retorno){
				//console.log(retorno.controlador.id);
				id = retorno.controlador.id;
				done();
			});
		});
		it(" [excluir por id] na base de dados",function(done){
			Controlador.excluirId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [excluir] na base dse dados",function(done){
			Controlador.excluirTodos(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	
});
