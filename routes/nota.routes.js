const {Router} = require('express');
const { check } = require('express-validator');
//Importo las funciones del controller
const controllerNota = require('../controllers/nota.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Guardar Nota
router.post('/crearNota' 
    // , [
    // check('rtasCorrectas','rtasCorrectas debe ser un numero válido').isNumeric,
    // check('cantidadPreguntas','cantidadPreguntas debe ser un numero válido').isNumeric,
    // check('DNI','DNI debe ser un numero válido').isNumeric,
    // check('fecha','fecha debe ser un fecha válida').isDate,
    // validarCampos
    // ]
    ,

    controllerNota.crearNota)

//Obtener las notas
router.get('/obtenerNotas', controllerNota.obtenerNotas)

router.put('/modificarNombre_y_apellido', controllerNota.modificarNombre_y_apellido)

router.delete('/eliminarNota',controllerNota.eliminarNota )

router.delete('/eliminarNotasUsuario',controllerNota.eliminarNotasUsuario )

module.exports = router;