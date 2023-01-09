const {Router} = require('express');
//Importo las funciones del controller
const controllerNota = require('../controllers/nota.controller');

const router = Router();

//Guardar Nota
router.post('/crearNota' , controllerNota.crearNota)

//Obtener las notas
router.get('/obtenerNotas', controllerNota.obtenerNotas)

//Modificar Nombre y Apellido 
router.put('/modificarNombre_y_apellido', controllerNota.modificarNombre_y_apellido)

//Eliminar una nota
router.delete('/eliminarNota',controllerNota.eliminarNota )

//Eliminar todas las notas de un Usuario
router.delete('/eliminarNotasUsuario',controllerNota.eliminarNotasUsuario )

module.exports = router;