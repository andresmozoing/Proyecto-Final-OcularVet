const {Router} = require('express');
const { check } = require('express-validator');
//Importo las funciones del controller
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//REGISTER
router.post('/new',
    [
        check('name','El nombre es obligatorio y debe tener al menos 2 letras').not().isEmpty().isLength({min:2}),
        check('surname','El apellido es obligatorio y debe tener al menos 2 letras').not().isEmpty().isLength({min:2}),
        check('DNI','El DNI es obligatorio').not().isEmpty().isNumeric(),
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6}),
        check('codigoRegistro','El codigo de registro no puede estar vacion').not().isEmpty(),
        validarCampos
    ] 
    ,crearUsuario);


//LOGIN con middleware, para verificaciones de parametros
router.post('/', 
    [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6}),
    validarCampos
    ]
    ,loginUsuario);

//VALIDAR y revalidar token
router.get('/renew',
            validarJWT, 
            revalidarToken);

module.exports = router;