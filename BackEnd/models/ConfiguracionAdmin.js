const { Schema, model } = require("mongoose")

const ConfiguracionAdminSchema = Schema({
    id: {
        type:Number
    },
    cantidadPacientesADiagnosticar:{
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