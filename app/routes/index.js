var express = require('express');
var HomeController = require('../controller/home_controller');
var UsuariosController = require('../controller/usuarios_controller');
var ControladoresController = require('../controller/controladores_controller');
var router = express.Router();

/* GET home page. */
router.get('/', HomeController.index);
router.get('/usuario', HomeController.usuario);

router.get('/usuarios.json', UsuariosController.todos);
router.post('/usuarios.json', UsuariosController.criar);
router.put('/usuarios.json', UsuariosController.atualizar);
router.get('/usuarios/:id.json', UsuariosController.porId);


router.post('/controladores.json', ControladoresController.criar);
router.get('/controladores.json', ControladoresController.todos);
router.put('/controladores.json', ControladoresController.atualizar);
router.get('/controladores/:id.json', ControladoresController.porId);


module.exports = router;
