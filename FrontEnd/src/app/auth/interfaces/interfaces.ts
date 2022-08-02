export interface AuthResponse{
    ok: boolean;
    uid?: string;
    name?: string;
    token?: string;
    msg?: string;
    email?:string;
}

export interface Usuario{
    uid: string;
    name: string;
    email: string;
}

