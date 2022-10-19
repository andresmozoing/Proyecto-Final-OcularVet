export interface NotaResponse {
    ok?: boolean,
    notas:Nota[]
}
export interface Nota {
    _id: String,
    name?: String,
    surname?: String,
    rtasCorrectas: number,
    cantidadPreguntas: number,
    calificacion: number,
    DNI: number,
    fecha: Date,
    __v?: Number
}
