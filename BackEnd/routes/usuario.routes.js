const {Router} = require('express');
const { check } = require('express-validator');
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
            [check('passwordNueva','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6})],
            controllerUsuario.modificarPassword)

router.delete('/eliminarUsuario',
               [],
               controllerUsuario.eliminarUsuario)

router.put('/configAdmin',
            [],
            controllerUsuario.modificarConfiguracionAdmin)

module.exports = router;