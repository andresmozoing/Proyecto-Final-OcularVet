const { Schema, model } = require("mongoose")

const UsuarioSchema = Schema({
    rtasCorrectas:{
        type: Number,
        required: true
    },
    cantidadPreguntas:{
        type: Number,
        required: true
    },
    LU:{
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = model('Nota', UsuarioSchema);