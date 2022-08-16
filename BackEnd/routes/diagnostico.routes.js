const {Router} = require('express');
const controllerDiagnostico  = require('../controllers/diagnostico.controller');

const router = Router();

//RUTAS
router.get('/obtenerTodosLosDiagnosticos', 
            [],
            controllerDiagnostico.obtenerTodosLosDiagnosticos)

router.post('/crearDiagnostico',
            [],
            controllerDiagnostico.crearDiagnostico)

module.exports = router;