export interface UsersResponse{
    ok:boolean;
    users: User[]
}

export interface User {
    ok: boolean;
    _id?:string;
    name?: string;
    surname ?: string;
    LU ?: number;
    email ?: string;
    msg?: string;
    isAdmin:boolean,
    fechaAlta?:Date
}

