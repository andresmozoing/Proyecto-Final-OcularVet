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
    DNI:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    calificacion: {
        type: Number,
        required: true
    }
})

module.exports = model('Nota', UsuarioSchema);