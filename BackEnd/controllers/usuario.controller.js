const ConfiguracionAdmin = require('../models/ConfiguracionAdmin');
const { response } =  require('express');




const modificarConfiguracionAdmin = async (req,res = response) => {
    try {
        console.log("Llego al modificarConfiguracionAdmin");
        const body = req.body;
        ConfiguracionAdmin.updateOne(
                {id:1},
                body,
                (err,docs) => {
                    res.send({
                        items : docs
                    })
                })

        return res.json({
            ok: true
       })
        
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarConfigAdmin'
        })
    }
} //Fin modificarConfiguracionAdmin()



module.exports = {
    modificarConfiguracionAdmin
}