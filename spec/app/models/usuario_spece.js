var Usuario = require('../../../app/models/usuario');

describe("Modelo de usuario", function(){
	describe(" atributo", function(){
		it(" [id].",function(){
			var usuario = new Usuario();
			expect(usuario.id).toBe(0);	
		});
		it(" [nome].",function(){
			var usuario = new Usuario();
			expect(usuario.nome).toBe("");
		});
		it(" [login].",function(){
			var usuario = new Usuario();
			expect(usuario.login).toBe("");
		});
		it(" [senha].",function(){
			var usuario = new Usuario();
			expect(usuario.senha).toBe("");
		});
		it(" [email].",function(){
			var usuario = new Usuario();
			expect(usuario.email).toBe("");
		});
	});

	describe(" metodo", function(){
		it(" [incluir] na base de dados",function(done){
			var usuario = new Usuario();
			usuario.nome="usuario";
			usuario.email="user@user";
			usuario.senha="****";
			usuario.login="user";
			usuario.salvar(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});

			
		});
	});

	describe(" metodo", function(){
		it(" [excluir todos] da base de dados",function(done){
			Usuario.excluirTodos(function(retorno){
				expect(retorno.error).toBe(false);
				done();
			});
		});
	});

	describe(" metodo", function(){
		it(" [buscar por id] da base de dados",function(done){
			Usuario.truncateTable(function(retorno1){
				var usuario = new Usuario();
				usuario.nome="usuario";
				usuario.email="user@user";
				usuario.senha="****";
				usuario.login="user";
				usuario.salvar(function(retorno2){
					Usuario.buscarPorId(1, function(retorno3){
						expect(retorno3.error).toBe(false);
						expect(retorno3.usuario.id).toBe(1);
						done();
					});
				});
			});
		});
	});

	describe(" metodo", function(){
		it(" [todos] da base de dados",function(done){

			Usuario.excluirTodos(function(retorno1){
				var usuario = new Usuario();
				usuario.nome="usuario";
				usuario.email="user@user";
				usuario.senha="****";
				usuario.login="user";
				usuario.salvar(function(retorno2){
					Usuario.todos(function(retorno3){
						expect(retorno3.error).toBe(false);
						expect(retorno3.usuarios.length).toBe(1);
						done();
					});
				});
			});
		});
	});

	describe(" metodo", function(){
		it(" [atualizar] na base de dados",function(done){
			Usuario.excluirTodos(function(retorno1){
				var usuario = new Usuario();
				usuario.nome="usuario";
				usuario.email="user@user";
				usuario.senha="****";
				usuario.login="user";
				usuario.salvar(function(retorno2){
					Usuario.todos(function(retorno3){
						var usuario = new Usuario(retorno3.usuarios[0]);
						usuario.nome="user";
						usuario.salvar(function(retorno4){
							expect(retorno4.error).toBe(false);
							done();
						});
					});
				});
			});
		});
	});


	describe(" metodo", function(){
		it(" [busca por nome] da base de dados",function(done){

			Usuario.excluirTodos(function(retorno1){
				var nome = "user";
				var usuario = new Usuario({nome: nome , email: "user@user", senha: "****", login: "user"});
				usuario.salvar(function(retorno2){
					var usuario2 = new Usuario({nome: "test", email: "user1@user1", senha: "****", login: "user1"});
					usuario2.salvar(function(retorno3){
						Usuario.buscarPorNome(nome, function(retorno4){
							//console.log(retorno4);
							expect(retorno4.error).toBe(false);
							expect(retorno4.usuarios.length).toBe(1);
							expect(retorno4.usuarios[0].nome).toBe(nome);
							done();
						});
					});
				});
			});
		});
	});

});