export interface AuthResponse{
    ok: boolean;
    uid?: string;
    name?: string;
    surname?: string;
    LU?: number;
    email?:string;
    isAdmin?: boolean;
    token?: string;
    msg?: string;
}

export interface Usuario{
    uid: string;
    name: string;
    surname: string;
    LU: number;
    email: string;
    isAdmin:boolean;
}

