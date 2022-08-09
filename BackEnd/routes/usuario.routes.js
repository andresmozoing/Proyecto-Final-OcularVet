const {Router} = require('express');
const controllerUsuario  = require('../controllers/usuario.controller');

const router = Router();

//RUTAS
router.get('/obtenerUsuario', 
            [],
            controllerUsuario.obtenerUsuario)

router.get('/obtenerTodosLosUsuarios', 
            [],
            controllerUsuario.obtenerTodosLosUsuarios)

router.put('/modificarUsuario',
            [],
            controllerUsuario.modificarUsuario)

router.put('/modificarPassword',
            [],
            controllerUsuario.modificarPassword)

router.delete('/eliminarUsuario',
               [],
               controllerUsuario.eliminarUsuario)

router.put('/configAdmin',
            [],
            controllerUsuario.modificarConfiguracionAdmin)

module.exports = router;