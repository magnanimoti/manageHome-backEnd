var db = require('../../config/db');

var Usuario = function(usuario){
	if(usuario !== undefined){
		this.id = usuario.id;
		this.nome = usuario.nome;
		this.login = usuario.login;
		this.senha = usuario.senha;
		this.email = usuario.email;
	}else{
		this.id = 0;
		this.nome = "";
		this.login = "";
		this.senha = "";
		this.email = "";	
	}
	
	this.salvar = function(callback){
		var query ="";
		if(this.nome ===""){
			console.log("[Modelo:Usuario] Nome obrigatório");
			return;
		}
		if(this.login ===""){
			console.log("[Modelo:Usuario] Login obrigatório");
			return;
		}
		if(this.senha ===""){
			console.log("[Modelo:Usuario] Senha obrigatório");
			return;
		}
		if(this.id === 0 | this.id === "" | this.id === undefined){
			
			query = "INSERT INTO usuarios (nome, senha, email, login) VALUES ('" + this.nome + "','" + this.senha + "', '" + this.email + "', '" + this.login + "');";
			db.cnn.exec(query, function (rows, err) {
				if(err !== undefined && err !== null){
					callback.call(null, {error: true, mesage: err.message});
					//console.log("ERRO ao [inserir] dados de usuario");
				}else{
					callback.call(null,{error: false});
					//console.log("SUCESSO ao [inserir] dados de usuario");
				}
				// body...
			});

		}else{
			query = "UPDATE usuarios SET nome='" + this.nome + "', senha='" + this.senha + "', email='" + this.email + "', login='" + this.login + "' WHERE id='" + this.id + "';";
			db.cnn.exec(query, function (rows, err) {
				if(err !== undefined && err !== null){
					//console.log("ERRO ao [atualizar] dados de usuario");
					callback.call(null, {error: true, mesage: err.message});
				}else{
					//console.log("SUCESSO ao [atualizar] dados de usuario");
					callback.call(null,{error: false});
				}
				// body...
			});
		}
	};
};
Usuario.excluirTodos = function(callback){
	query = "DELETE FROM usuarios;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};

Usuario.todos = function(callback){
	query = "SELECT * FROM usuarios;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				usuarios: []
			});
		}else{
			callback.call(null,{
				error: false, 
				usuarios: rows
			});
		}
	});
};

Usuario.buscarPorId = function(id, callback){
	query = "SELECT * FROM usuarios WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				usuario: {}
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					usuario: rows[0]
				});	
			}else{
				callback.call(null,{
					error: false, 
					usuario: {}
				});
			}
		}
	});
};

Usuario.buscarPorNome = function(nome, callback){
	query = "SELECT * FROM usuarios WHERE nome like '%" + nome + "%';";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				usuarios: []
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					usuarios: rows
				});	
			}else{
				callback.call(null,{
					error: false, 
					usuarios: []
				});
			}
		}
	});
};

Usuario.truncateTable = function(callback){
	query = "TRUNCATE usuarios;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
module.exports = Usuario;