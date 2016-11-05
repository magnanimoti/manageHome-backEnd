var Dispositivo = require('../../../app/models/dispositivo');

describe("Modelo de Dispositivo", function(){
	describe(" atributo", function(){
		it(" [id].",function(){
			var dispositivo = new Dispositivo();
			expect(dispositivo.id).toBe(0);	
		});
		it(" [nome].",function(){
			var dispositivo = new Dispositivo();
			expect(dispositivo.nome).toBe("");
		});
		it(" [tipo].",function(){
			var dispositivo = new Dispositivo();
			expect(dispositivo.tipo).toBe("");
		});
		
	});

	describe(" metodo", function(){
		it(" [consultar ultimmo] na base de dados",function(done){
			Dispositivo.consultarUltimo(function(retorno){
				//console.log(retorno.dispositivo.id);
				//console.log(retorno.dispositivo);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [incluir] na base de dados",function(done){
			var dispositivo = new Dispositivo();
			dispositivo.nome="inter1";
			dispositivo.tipo="bipolar";
			dispositivo.salvar(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		it(" [consultar] na base de dados",function(done){
			Dispositivo.consultar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Dispositivo.consultarUltimo(function(retorno){
				//console.log(retorno.dispositivo.id);
				id = retorno.dispositivo.id;
				done();
			});
		});
		it(" [consultar por id] na base de dados",function(done){
			Dispositivo.consultarId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				expect(retorno.dispositivo.id).toBe(id);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var dispositivoNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Dispositivo.consultarUltimo(function(retorno){
		//		console.log(retorno.dispositivo);
				dispositivoNew = retorno.dispositivo;
				done();
			});
		});
		it(" [atualizar] na base de dados",function(done){
			var dispositivo = new Dispositivo(dispositivoNew);
			dispositivo.tipo="unip";
			dispositivo.nome="interruptor";
			dispositivo.salvar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Dispositivo.consultarUltimo(function(retorno){
				//console.log(retorno.dispositivo.id);
				id = retorno.dispositivo.id;
				done();
			});
		});
		it(" [excluir por id] na base de dados",function(done){
			Dispositivo.excluirId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [excluir] na base dse dados",function(done){
			Dispositivo.excluirTodos(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	
});
