var express = require('express');
var HomeController = require('../controller/home_controller');
var UsuariosController = require('../controller/usuarios_controller');
var ControladoresController = require('../controller/controladores_controller');
var DispositivosController = require('../controller/dispositivos_controller');
var CenasController = require('../controller/cenas_controller');
var PortasController = require('../controller/portas_controller');
var IluminacoesController = require('../controller/iluminacoes_controller');
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

router.post('/dispositivos.json', DispositivosController.criar);
router.get('/dispositivos.json', DispositivosController.todos);
router.put('/dispositivos.json', DispositivosController.atualizar);
router.get('/dispositivos/:id.json', DispositivosController.porId);

router.post('/cenas.json', CenasController.criar);
router.get('/cenas.json', CenasController.todos);
router.put('/cenas.json', CenasController.atualizar);
router.get('/cenas/:id.json', CenasController.porId);

router.post('/portas.json', PortasController.criar);
router.get('/portas.json', PortasController.todos);
router.put('/portas.json', PortasController.atualizar);
router.get('/portas/:id.json', PortasController.porId);

router.post('/iluminacoes.json', IluminacoesController.criar);
router.get('/iluminacoes.json', IluminacoesController.todos);
router.put('/iluminacoes.json', IluminacoesController.atualizar);
router.get('/iluminacoes/:id.json', IluminacoesController.porId);

module.exports = router;
