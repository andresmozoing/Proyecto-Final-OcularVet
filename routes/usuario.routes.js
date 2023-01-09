const {Router} = require('express');
const { check } = require('express-validator');
const controllerUsuario  = require('../controllers/usuario.controller');

const router = Router();

//RUTAS
//Obtener un Usuario
router.get('/obtenerUsuario',[], controllerUsuario.obtenerUsuario)

//Obtener un Usuario
router.get('/obtenerTodosLosUsuarios',[], controllerUsuario.obtenerTodosLosUsuarios)

//Modificar un Usuario
router.put('/modificarUsuario',[], controllerUsuario.modificarUsuario)

//Modificar password de un Usuario
router.put('/modificarPassword',
[check('passwordNueva','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6})],
controllerUsuario.modificarPassword)

//Reiniciar password de un Usuario
router.put('/reiniciarPassword',
            [check('passwordNueva','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6})],
            controllerUsuario.reiniciarPassword)

//Modificar usuario  y convertir en administrador
router.put('/hacerAdmin',[], controllerUsuario.hacerAdmin)

//Eliminar Usuario
router.delete('/eliminarUsuario',[], controllerUsuario.eliminarUsuario)

//Obtener la configuracion de Administrador
router.get('/obtenerConfigAdmin',[], controllerUsuario.obtenerConfigAdmin)

//Modificar la configuarion de Administrador
router.put('/modificarConfigAdmin',[], controllerUsuario.modificarConfiguracionAdmin)

module.exports = router;