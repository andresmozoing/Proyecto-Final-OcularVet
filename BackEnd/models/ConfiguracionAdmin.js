const { Schema, model } = require("mongoose")

const ConfiguracionAdminSchema = Schema({
    id: {
        type:Number
    },
    cantidadPacientesAResponder:{
        type: Number
    },
    tiempoRespuesta:{
        type: Number
    },
    codigoRegistro:{
        type: Number
    }
})

module.exports = model('ConfiguracionAdmin', ConfiguracionAdminSchema);