var Iluminacao = require('../../../app/models/iluminacao');
var Cena = require('../../../app/models/cena');
var Dispositivo = require('../../../app/models/dispositivo');

describe("Modelo de Iluminacao", function(){
	describe(" atributo", function(){
		it(" [id].",function(){
			var iluminacao = new Iluminacao();
			expect(iluminacao.id).toBe(0);	
		});
		it(" [nome].",function(){
			var iluminacao = new Iluminacao();
			expect(iluminacao.nome).toBe("");
		});
		it(" [estado].",function(){
			var iluminacao = new Iluminacao();
			expect(iluminacao.estado).toBe(false);
		});
		it(" [cena].",function(){
			var iluminacao = new Iluminacao();
			expect(iluminacao.cena).toBe(undefined);
		});
		it(" [dispositivo].",function(){
			var iluminacao = new Iluminacao();
			expect(iluminacao.dispositivo).toBe(undefined);
		});
		
	});

	describe(" metodo", function(){
		it(" [consultar ultimmo] na base de dados",function(done){
			Iluminacao.consultarUltimo(function(retorno){
				//console.log(retorno.iluminacao.id);
				//console.log(retorno.iluminacao);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		var cenaId;
		var dispositivoId;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			var cena = new Cena({nome: "sala", estado: false});
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
		it(" [incluir] na base de dados",function(done){
			var iluminacao = new Iluminacao();
			iluminacao.nome="centroSala1";
			iluminacao.estado=false;
			iluminacao.cena = cenaId;
			iluminacao.dispositivo = dispositivoId;
			iluminacao.salvar(function(retorno){
				//console.log(retorno);	
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		it(" [consultar] na base de dados",function(done){
			Iluminacao.consultar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Iluminacao.consultarUltimo(function(retorno){
				//console.log(retorno.iluminacao.id);
				id = retorno.iluminacao.id;
				done();
			});
		});
		it(" [consultar por id] na base de dados",function(done){
			Iluminacao.consultarId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				expect(retorno.iluminacao.id).toBe(id);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var iluminacaoNew={};
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Iluminacao.consultarUltimo(function(retorno){
		//		console.log(retorno.iluminacao);
				iluminacaoNew = retorno.iluminacao;
				done();
			});
		});
		it(" [atualizar] na base de dados",function(done){
			var iluminacao = new Iluminacao(iluminacaoNew);
			iluminacao.estado=true;
			iluminacao.nome="sanca";
			iluminacao.salvar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});		
		});
	});

	describe(" metodo", function(){
		var id;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Iluminacao.consultarUltimo(function(retorno){
				//console.log(retorno.iluminacao.id);
				id = retorno.iluminacao.id;
				done();
			});
		});
		it(" [excluir por id] na base de dados",function(done){
			Iluminacao.excluirId(id,function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [excluir] na base dse dados",function(done){
			Iluminacao.excluirTodos(function(retorno){
				//console.log(retorno);
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	
});
