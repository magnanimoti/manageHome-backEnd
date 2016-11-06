var Cena = require('../../../app/models/cena');

describe("Modelo de Cena", function(){
	describe(" atributo", function(){
		it(" [id].",function(){
			var cena = new Cena();
			expect(cena.id).toBe(0);	
		});
		it(" [nome].",function(){
			var cena = new Cena();
			expect(cena.nome).toBe("");
		});
		it(" [estado].",function(){
			var cena = new Cena();
			expect(cena.estado).toBe(false);
		});
		
	});

	describe(" metodo", function(){
		it(" [consultar ultimmo] na base de dados",function(done){
			Cena.consultarUltimo(function(retorno){
				//console.log(retorno.cena.id);
				//console.log(retorno.cena);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [incluir] na base de dados",function(done){
			var cena = new Cena();
			cena.nome="quarto";
			cena.estado= true;
			cena.salvar(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		it(" [consultar] na base de dados",function(done){
			Cena.consultar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Cena.consultarUltimo(function(retorno){
				//console.log(retorno.cena.id);
				id = retorno.cena.id;
				done();
			});
		});
		it(" [consultar por id] na base de dados",function(done){
			Cena.consultarId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				expect(retorno.cena.id).toBe(id);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var cenaNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Cena.consultarUltimo(function(retorno){
		//		console.log(retorno.cena);
				cenaNew = retorno.cena;
				done();
			});
		});
		it(" [atualizar] na base de dados",function(done){
			var cena = new Cena(cenaNew);
			cena.estado= false;
			cena.nome="cozinha";
			cena.salvar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Cena.consultarUltimo(function(retorno){
				//console.log(retorno.cena.id);
				id = retorno.cena.id;
				done();
			});
		});
		it(" [excluir por id] na base de dados",function(done){
			Cena.excluirId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [excluir] na base dse dados",function(done){
			Cena.excluirTodos(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	
});
