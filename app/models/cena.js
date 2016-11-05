var db = require('../../config/managedb');

var Cena = function(cena){
	if(cena !== undefined){
		this.id = cena.id;
		this.nome = cena.nome;
		this.estado = cena.estado;
	}else{
		this.id = 0;
		this.estado = false;
		this.nome = "";
	}
	this.salvar = function(callback){
		var query ="";
		if(this.estado ===""){
		 	console.log("[Modelo:Cena] Tipo obrigatório");
		 	return;
		}
		if(this.nome ===""){
		 	console.log("[Modelo:Cena] Nome obrigatório");
		 	return;
		}
		if(this.id === 0 | this.id === "" | this.id === undefined){
			//console.log(this);
			query = "INSERT INTO managedb.cenas (nome, estado) VALUES ('" + this.nome + "','" + this.estado + "');";
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
			query = "UPDATE managedb.cenas SET nome='" + this.nome + "', estado='" + this.estado + "' WHERE id='" + this.id + "';";
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

Cena.excluir = function(id,callback){
	query = "DELETE FROM cenas WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Cena.consultar = function(callback){
	query = "SELECT * FROM cenas;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				cenas: []
			});
		}else{
			callback.call(null,{
				error: false, 
				cenas: rows
			});
		}
	});
};

Cena.consultarUltimo = function(callback){
	query = "SELECT * FROM cenas ORDER BY id DESC LIMIT 1;";
	db.cnn.exec(query, function (rows, err) {
	if(err !== undefined && err !== null){
		callback.call(null, {
			error: true, 
				mesage: err.message, 
				cena: {}
			});
		}else{
		//console.log(rows);
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					cena: rows[0]
				});
			}else{
				callback.call(null,{
					error: false, 
					cena: {}
				});
			}
		}
	});
};
Cena.consultarId = function(id, callback){
	query = "SELECT * FROM cenas WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				cena: {}
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					cena: rows[0]
				});	
			}else{
				callback.call(null,{
					error: false, 
					cena: {}
				});
			}
		}
	});
};
Cena.excluirTodos = function(callback){
	query = "DELETE FROM cenas;";
	//query = "TRUNCATE cenas;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Cena.excluirId = function(id, callback){
	query = "DELETE FROM cenas WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
module.exports = Cena;