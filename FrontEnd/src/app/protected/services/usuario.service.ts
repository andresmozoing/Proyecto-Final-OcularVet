import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { perfilUsuario} from '../interfaces/DatosPerfil';
import { Nota } from '../interfaces/Nota';
import { ConfigAdmin, ConfigAdminResponse } from '../interfaces/ConfigAdmin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl : string = environment.baseURL;
  
  constructor(private http: HttpClient) { }

  obtenerConfigAdmin (){
    const url = `${this.baseUrl}/usuario/obtenerConfigAdmin`
    const body= {}

    return this.http.get<ConfigAdminResponse>(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
        )
  } 

  modificarUsuario(_id:string, name:string, surname: string, email: string ){

    const url = `${this.baseUrl}/usuario/modificarUsuario`
    const body= { _id, name, surname,email};
    
    
    return this.http.put<perfilUsuario>(url,body)
    .pipe(
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
      
  }
  modificarPassword(_id:string, passwordActual:string, passwordNueva: string ){

    const url = `${this.baseUrl}/usuario/modificarPassword`
    const body= { _id, passwordActual,passwordNueva};
    
    
    return this.http.put<perfilUsuario>(url,body)
    .pipe(
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
      
  }
  

}
