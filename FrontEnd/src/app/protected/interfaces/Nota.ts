export interface NotaResponse {
    ok?: boolean,
    notas:Nota[]
}
export interface Nota {
    _id: String,
    name?: String,
    surname?: String,
    rtasCorrectas: Number,
    cantidadPreguntas: Number,
    calificacion: Number,
    LU: Number,
    fecha: Date,
    __v?: Number
}