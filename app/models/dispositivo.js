var db = require('../../config/managedb');

var Dispositivo = function(dispositivo){
	if(dispositivo !== undefined){
		this.id = dispositivo.id;
		this.nome = dispositivo.nome;
		this.tipo = dispositivo.tipo;
	}else{
		this.id = 0;
		this.tipo = "";
		this.nome = "";
	}
	this.salvar = function(callback){
		var query ="";
		if(this.tipo ===""){
		 	console.log("[Modelo:Dispositivo] Tipo obrigatório");
		 	return;
		}
		if(this.nome ===""){
		 	console.log("[Modelo:Dispositivo] Nome obrigatório");
		 	return;
		}
		if(this.id === 0 | this.id === "" | this.id === undefined){
			//console.log(this);
			query = "INSERT INTO managedb.dispositivos (nome, tipo) VALUES ('" + this.nome + "','" + this.tipo + "');";
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
			query = "UPDATE managedb.dispositivos SET nome='" + this.nome + "', tipo='" + this.tipo + "' WHERE id='" + this.id + "';";
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

Dispositivo.excluir = function(id,callback){
	query = "DELETE FROM dispositivos WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Dispositivo.consultar = function(callback){
	query = "SELECT * FROM dispositivos;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				dispositivos: []
			});
		}else{
			callback.call(null,{
				error: false, 
				dispositivos: rows
			});
		}
	});
};

Dispositivo.consultarUltimo = function(callback){
	query = "SELECT * FROM dispositivos ORDER BY id DESC LIMIT 1;";
	db.cnn.exec(query, function (rows, err) {
	if(err !== undefined && err !== null){
		callback.call(null, {
			error: true, 
				mesage: err.message, 
				dispositivo: {}
			});
		}else{
		//console.log(rows);
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					dispositivo: rows[0]
				});
			}else{
				callback.call(null,{
					error: false, 
					dispositivo: {}
				});
			}
		}
	});
};
Dispositivo.consultarId = function(id, callback){
	query = "SELECT * FROM dispositivos WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				dispositivo: {}
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					dispositivo: rows[0]
				});	
			}else{
				callback.call(null,{
					error: false, 
					dispositivo: {}
				});
			}
		}
	});
};
Dispositivo.excluirTodos = function(callback){
	query = "DELETE FROM dispositivos;";
	//query = "TRUNCATE dispositivos;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Dispositivo.excluirId = function(id, callback){
	query = "DELETE FROM dispositivos WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
module.exports = Dispositivo;