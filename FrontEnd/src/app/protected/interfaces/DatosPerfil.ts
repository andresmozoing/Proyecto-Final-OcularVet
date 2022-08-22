export interface perfilUsuario {
    ok: boolean;
    _id?:string;
    name?: string;
    surname ?: string;
    LU ?: number;
    email ?: string;
    acknowledged?: true;
    modifiedCount?: number;
    upsertedId?: any;
    upsertedCount?: number;
    matchedCount?: number;
    msg?: string
}
export interface NotaResponse {
    ok?: boolean,
    notas:Nota[]
    
}
export interface Nota {
    _id: String,
    rtasCorrectas: Number,
    cantidadPreguntas: Number,
    LU: Number,
    fecha: Date,
    __v?: Number
}
