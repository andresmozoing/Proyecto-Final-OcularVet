const { response } = require("express");
const { validationResult } =  require('express-validator');

const validarCampos = (req,res = response,next)=>{
    const errors = validationResult( req );
    console.log("Los errores dsp del check son " , errors);
    if ( !errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}


module.exports = {
    validarCampos
}