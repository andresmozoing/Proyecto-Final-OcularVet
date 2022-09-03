const { Schema, model } = require("mongoose")

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    LU:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    fechaAlta:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = model('Usuario', UsuarioSchema);
