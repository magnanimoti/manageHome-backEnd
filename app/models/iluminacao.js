var db = require('../../config/managedb');

var iluminacao = function(iluminacao){
	if(iluminacao !== undefined){
		this.id = iluminacao.id;
		this.none = iluminacao.none;
		this.estado = iluminacao.estado;
		this.cena = iluminacao.cena_id;
		this.dispositivo = iluminacao.dispositivo_id;
	}else{
		this.id = 0;
		this.estado = false;
		this.nome = "";
		this.cena = undefined;
		this.dispositivo = undefined;
	}
	this.salvar = function(callback){
		var query ="";
		if(this.estado === undefined){
		 	console.log("[Modelo:iluminacao] Tipo obrigatório");
		 	return;
		}
		if(this.nome ===""){
		 	console.log("[Modelo:iluminacao] Nome obrigatório");
		 	return;
		}
		if(this.cena ===undefined){
		 	console.log("[Modelo:iluminacao] Cena obrigatório");
		 	return;
		}
		if(this.dispositivo ===undefined){
		 	console.log("[Modelo:iluminacao] dispositivo obrigatório");
		 	return;
		}
		if(this.id === 0 | this.id === "" | this.id === undefined){
			
			query = "INSERT INTO managedb.iluminacoes (nome, estado, dispositivo_id, cena_id) VALUES ('" + this.nome + "','" + this.estado + "','" + this.dispositivo + "','" + this.cena + "');";
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
			query = "UPDATE managedb.iluminacoes SET nome='" + this.nome + "', estado='" + this.estado + "', dispositivo_id='" + this.dispositivo + "', cena_id='" + this.cena + "' WHERE id='" + this.id + "';";
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

iluminacao.excluir = function(id,callback){
	query = "DELETE FROM iluminacoes WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
iluminacao.consultar = function(callback){
	query = "SELECT * FROM iluminacoes;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				iluminacoes: []
			});
		}else{
			callback.call(null,{
				error: false, 
				iluminacoes: rows
			});
		}
	});
};

iluminacao.consultarUltimo = function(callback){
	query = "SELECT * FROM iluminacoes ORDER BY id DESC LIMIT 1;";
	db.cnn.exec(query, function (rows, err) {
	if(err !== undefined && err !== null){
		callback.call(null, {
			error: true, 
				mesage: err.message, 
				iluminacao: {}
			});
		}else{
		//console.log(rows);
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					iluminacao: rows[0]
				});
			}else{
				callback.call(null,{
					error: false, 
					iluminacao: {}
				});
			}
		}
	});
};
iluminacao.consultarId = function(id, callback){
	query = "SELECT * FROM iluminacoes WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				iluminacao: {}
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					iluminacao: rows[0]
				});	
			}else{
				callback.call(null,{
					error: false, 
					iluminacao: {}
				});
			}
		}
	});
};
iluminacao.excluirTodos = function(callback){
	query = "DELETE FROM iluminacoes;";
	//query = "TRUNCATE iluminacoes;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
iluminacao.excluirId = function(id, callback){
	query = "DELETE FROM iluminacoes WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
module.exports = iluminacao;