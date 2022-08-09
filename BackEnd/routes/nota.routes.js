const {Router} = require('express');
const { check } = require('express-validator');
//Importo las funciones del controller
const controllerNota = require('../controllers/nota.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Guardar Nota
router.put('/crearNota' 
    // , [
    // check('rtasCorrectas','rtasCorrectas debe ser un numero válido').isNumeric,
    // check('cantidadPreguntas','cantidadPreguntas debe ser un numero válido').isNumeric,
    // check('LU','LU debe ser un numero válido').isNumeric,
    // check('fecha','fecha debe ser un fecha válida').isDate,
    // validarCampos
    // ]
    ,

    controllerNota.crearNota)

//Obtener las notas
router.get('/obtenerNotas', controllerNota.obtenerNotas)

router.delete('/eliminarNota',controllerNota.eliminarNota )

module.exports = router;