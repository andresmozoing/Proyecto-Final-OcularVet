const {Router} = require('express');

//Importo las funciones del controller
const { modificarConfiguracionAdmin } = require('../controllers/usuario.controller');


const router = Router();

//RUTAS
router.put('/configAdmin',
            [ ],
            modificarConfiguracionAdmin)


module.exports = router;