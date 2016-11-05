var db = require('../../config/managedb');

var Porta = function(porta){
	if(porta !== undefined){
		this.id = porta.id;
		this.numero = porta.numero;
		this.valor = porta.valor;
		this.tipo = porta.tipo;
		this.modo = porta.modo;
		this.controlador = porta.controlador_id;
		this.dispositivo = porta.dispositivo_id;
	}else{
		this.id = 0;
		this.numero = undefined;
		this.valor = undefined;
		this.tipo = "";
		this.modo = "";
		this.controlador = undefined;
		this.dispositivo = undefined;
	}
	this.salvar = function(callback){
		var query ="";
		if(this.numero === undefined){
		 	console.log("[Modelo:Porta] Numero obrigatório");
		 	return;
		}
		if(this.valor ===undefined){
		 	console.log("[Modelo:Porta] Valor obrigatório");
		 	return;
		}
		if(this.tipo ===""){
		 	console.log("[Modelo:Porta] Tipo obrigatório");
		 	return;
		}
		if(this.modo ===""){
		 	console.log("[Modelo:Porta] Modo obrigatório");
		 	return;
		}
		if(this.dispositivo === undefined){
		  	console.log("[Modelo:Porta]  Dispositivo obrigatório");
		  	return;	
		}
		if(this.controlador === undefined){
			console.log("[Modelo:Porta] Controlador obrigatório");
		  	return;
		}

		if(this.id === 0 | this.id === "" | this.id === undefined){
			
			query = "INSERT INTO managedb.portas (numero, valor, tipo, modo, dispositivo_id, controlador_id) VALUES ('" + this.numero + "','" + this.valor + "','" + this.tipo + "','" + this.modo + "','" + this.dispositivo + "','" + this.controlador + "');";
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
			query = "UPDATE managedb.portas SET numero='" + this.numero + "', valor='" + this.valor + "', tipo='" + this.tipo + "', modo='" + this.modo + "', dispositivo_id='" + this.dispositivo + "', controlador_id='" + this.controlador + "' WHERE id='" + this.id + "';";
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

Porta.excluir = function(id,callback){
	query = "DELETE FROM portas WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Porta.consultar = function(callback){
	query = "SELECT * FROM portas;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				portas: []
			});
		}else{
			callback.call(null,{
				error: false, 
				portas: rows
			});
		}
	});
};

Porta.consultarUltimo = function(callback){
	query = "SELECT * FROM portas ORDER BY id DESC LIMIT 1";
	db.cnn.exec(query, function (rows, err) {
	if(err !== undefined && err !== null){
		callback.call(null, {
			error: true, 
				mesage: err.message, 
				porta: {}
			});
		}else{
		//console.log(rows);
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					porta: rows[0]
				});
			}else{
				callback.call(null,{
					error: false, 
					porta: {}
				});
			}
		}
	});
};
Porta.consultarId = function(id, callback){
	query = "SELECT * FROM portas WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {
				error: true, 
				mesage: err.message, 
				porta: {}
			});
		}else{
			if(rows.length > 0){
				callback.call(null,{
					error: false, 
					porta: rows[0]
				});	
			}else{
				callback.call(null,{
					error: false, 
					porta: {}
				});
			}
		}
	});
};
Porta.excluirTodos = function(callback){
	query = "DELETE FROM portas;";
	//query = "TRUNCATE portas;";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
Porta.excluirId = function(id, callback){
	query = "DELETE FROM portas WHERE id =" + id + ";";
	db.cnn.exec(query, function (rows, err) {
		if(err !== undefined && err !== null){
			callback.call(null, {error: true, mesage: err.message});
		}else{
			callback.call(null,{error: false});
		}
				// body...
	});
};
module.exports = Porta;