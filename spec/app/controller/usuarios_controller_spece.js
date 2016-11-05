var Usuario = require('../../../app/models/usuario');
var request = require('request');

var host = "http://localhost:3000";


describe("Controle de usuarios", function(){
	describe(" GET /usuarios.json retornar [todos]", function(){
		it("returns status code 200",function(done){
			request.get(host +"/usuarios.json", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
				}	
				done();
			});
		});	
	});

	describe(" GET /usuarios.json?nome=user retornar [usuario]", function(){
		it("returns status code 200 e [user no serviço]",function(done){
			request.get(host +"/usuarios.json?nome=user", function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
	    			//console.log(json); 
					expect(json.length).toBe(1);	
					expect(json[0].nome).toBe("user");
				}	
				done();
			});
		});	
	});

	describe(" GET /usuarios/1.json retornar somente um [usuario]", function(){
		it("returns status code 200 e somente 1 [usuario]",function(done){

			Usuario.truncateTable(function(retorno1){
				var usuario = new Usuario();
				usuario.nome="usuario";
				usuario.email="user@user";
				usuario.senha="****";
				usuario.login="user";
				usuario.salvar(function(retorno2){
					request.get(host +"/usuarios/1.json", function(error, response, body){
						if(response === undefined){
							console.log("Não consegui localizar o servidor");
							expect(503).toBe(200);
						}else{
							expect(response.statusCode).toBe(200);
							var json = JSON.parse(response.body);
							//console.log(json); 
							expect(json.id).toBe(1);
							expect(json.nome).not.toBe(undefined);	
						}	
						done();
					});
				});	
			});

			
		});	
	});
	describe(" POST /usuarios.json criar [usuario]", function(){
		it("returns status code 201 e  mensagem de [usuario] criado",function(done){
			request.post({url:host +"/usuarios.json",form: {nome:'user2', email: 'user2@user2', senha: '***', login: 'user2'}}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{

					expect(response.statusCode).toBe(201);

					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Usuario criado com sucesso");
				}	
				done();
			});
		});	
	});

	describe(" PUT /usuarios.json atualizar [usuario]", function(){
		var usuarioCadastrado;
		beforeEach(function(done){ //executa todo este codigo antes de fazer  it
			Usuario.excluirTodos(function(retorno1){
				var usuario = new Usuario();
				usuario.nome = "user3";
				usuario.login = "user3";
				usuario.senha = "***";
				usuario.email = "user3@user3";
				usuario.salvar(function(retorno2){
					Usuario.todos(function(retorno3){
						if(!retorno3.error){
							usuarioCadastrado = retorno3.usuarios[0];	
						}
						done();
					});
				});
			});
		});
		it("returns status code 200 e [usuario] atualizado",function(done){	
			usuarioCadastrado.nome = "user";
			request.put({url:host +"/usuarios.json",form: usuarioCadastrado}, function(error, response, body){
				if(response === undefined){
					console.log("Não consegui localizar o servidor");
					expect(503).toBe(200);
				}else{
					expect(response.statusCode).toBe(200);
					var json = JSON.parse(response.body);
					//console.log(json); 	
					expect(json.mensagem).toBe("Usuario atualizado com sucesso");
					Usuario.buscarPorId(usuarioCadastrado.id, function(retorno){
						expect(retorno.usuario.nome).toBe("user");
						done();
					});
				}	
				done();
			});
		});
		it("returns status code 200 e [usuario] criado",function(done){	
			request.put({url:host +"/usuarios.json",form: {}}, function(error, response, body){
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