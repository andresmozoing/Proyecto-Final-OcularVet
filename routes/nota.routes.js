const {Router} = require('express');
//Importo las funciones del controller
const controllerNota = require('../controllers/nota.controller');

const router = Router();

//Guardar Nota
router.post('/crearNota' , controllerNota.crearNota)

//Obtener las notas
router.get('/obtenerNotas', controllerNota.obtenerNotas)

router.put('/modificarNombre_y_apellido', controllerNota.modificarNombre_y_apellido)

router.delete('/eliminarNota',controllerNota.eliminarNota )

router.delete('/eliminarNotasUsuario',controllerNota.eliminarNotasUsuario )

module.exports = router;