export interface Diagnostico {
    id:string;
    descripcion: string;
    derIluminado_AchicaDer : boolean;
    derIluminado_AchicaIzq : boolean;
    izqIluminado_AchicaDer : boolean;
    izqIluminado_AchicaIzq : boolean;
}

export interface DiagnosticoResponse{
    ok: boolean;
    id?:string;
    descripcion?: String;
    derIluminado_AchicaDer? : boolean;
    derIluminado_AchicaIzq? : boolean;
    izqIluminado_AchicaDer? : boolean;
    izqIluminado_AchicaIzq? : boolean;
    msg?: string;
}
