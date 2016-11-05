var db = require('../../config/managedb');

var Controlador = function(controlador){
	if(controlador !== undefined){
		this.id = controlador.id;
		this.nome = controlador.nome;
		this.ip = controlador.ip;
	}else{	
		this.id = 0;
		this.nome = "";
		this.ip = "";	
	}
	//console.log(controlador);
	this.salvar = function(callback){
		var query ="";
		if(this.nome ===""){
			console.log("[Modelo:Controlador] Nome obrigatório");
			return;
		}
		if(this.ip ===""){
			console.log("[Modelo: Controlador] ip obrigatório");
			return;
		}
		if(this.id === 0 | this.id === "" | this.id === undefined){
			
			query = "INSERT INTO managedb.controladores (nome, ip) VALUES ('" + this.nome + "','" + this.ip + "');";
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
			query = "UPDATE managedb.controladores SET nome='" + this.nome + "', ip='" + this.ip + "' WHERE id='" + this.id + "';";
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
Controlador.excluir = function(id,callback){
	query = "DELETE FROM controladores WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Controlador.consultar = function(callback){
	query = "SELECT * FROM controladores;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				controladores: []
			});
		}else{
			callback.call(null,{
				error: false, 
				controladores: rows
			});
		}
	});
};

Controlador.consultarUltimo = function(callback){
	query = "SELECT * FROM controladores ORDER BY id DESC LIMIT 1";
	db.cnn.exec(query, function (rows, err) {
	if(err !== undefined && err !== null){
		callback.call(null, {
			error: true, 
				mesage: err.message, 
				controlador: {}
			});
		}else{
		//console.log(rows);
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					controlador: rows[0]
				});
			}else{
				callback.call(null,{
					error: false, 
					controlador: {}
				});
			}
		}
	});
};
Controlador.consultarId = function(id, callback){
	query = "SELECT * FROM controladores WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				controlador: {}
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					controlador: rows[0]
				});	
			}else{
				callback.call(null,{
					error: false, 
					controlador: {}
				});
			}
		}
	});
};
Controlador.excluirTodos = function(callback){
	query = "DELETE FROM controladores;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Controlador.excluirId = function(id, callback){
	query = "DELETE FROM controladores WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
module.exports = Controlador;