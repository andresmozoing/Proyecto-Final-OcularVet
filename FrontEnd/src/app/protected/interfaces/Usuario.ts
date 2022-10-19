export interface UsersResponse{
    ok:boolean;
    users: User[]
}

export interface User {
    ok: boolean;
    _id?:string;
    name?: string;
    surname ?: string;
    DNI ?: number;
    email ?: string;
    msg?: string;
    isAdmin:boolean;
    fechaAlta:Date;
}

