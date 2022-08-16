const { Schema, model } = require("mongoose")

const Diagnostico = Schema({
    id: {
        type:String,
        unique:true
    },
    descripcion:{
        type: String
    },
    derIluminado_AchicaDer:{
        type: Boolean
    },
    derIluminado_AchicaIzq:{
        type: Boolean
    },
    izqIluminado_AchicaDer:{
        type: Boolean
    },
    izqIluminado_AchicaIzq:{
        type: Boolean
    }
})

module.exports = model('Diagnostico', Diagnostico);
