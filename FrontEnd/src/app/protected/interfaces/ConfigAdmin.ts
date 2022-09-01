export interface ConfigAdmin {
    cantidadPacientesADiagnosticar: Number,
    tiempoRespuesta: Number,
    codigoRegistro: Number
}

export interface ConfigAdminResponse{
    ok: boolean;
    cantidadPacientesADiagnosticar?: Number,
    tiempoRespuesta?: Number,
    codigoRegistro?: Number
}
