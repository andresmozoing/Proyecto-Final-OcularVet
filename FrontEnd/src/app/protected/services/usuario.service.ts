import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User, UsersResponse } from '../interfaces/Usuario';
import { Nota } from '../interfaces/Nota';
import { ConfigAdmin, ConfigAdminResponse } from '../interfaces/ConfigAdmin';
import { Usuario } from 'src/app/auth/interfaces/interfaces';

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
    
    
    return this.http.put<User>(url,body)
    .pipe(
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
      
  }

  modificarPassword(_id:string, passwordActual:string, passwordNueva: string ){

    const url = `${this.baseUrl}/usuario/modificarPassword`
    const body= { _id, passwordActual,passwordNueva};
    
    return this.http.put<User>(url,body)
    .pipe(
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
    );
      
  }
  
  reiniciarPassword(_id:string, passwordNueva: string ){

    const url = `${this.baseUrl}/usuario/reiniciarPassword`
    const body= { _id, passwordNueva};
    
    return this.http.put(url,body)
    .pipe(
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
    );
      
  }

  obtenerUsuarios(){

    const url = `${this.baseUrl}/usuario/obtenerTodosLosUsuarios`
    
    
    return this.http.get<UsersResponse>(url)
    .pipe(
      tap( resp => {
        
        
        console.log("Usuarios obtenidosa: ", resp);
        return resp
      }),
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
      
  }
  eliminarUsuario(_id:string){

    const url = `${this.baseUrl}/usuario/eliminarUsuario`
    const headers = new HttpHeaders()
      .set('_id' , _id)

      
    
    console.log("HEADERS: ", headers);
    console.log("_id el param de arriba: ", _id);
    
    return this.http.delete(url,{headers})
    .pipe(
      tap( resp => {
        
        
        console.log("Volvio de la base, delete resp: ", resp);
        return resp
      }),
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
      
  }
  

}
