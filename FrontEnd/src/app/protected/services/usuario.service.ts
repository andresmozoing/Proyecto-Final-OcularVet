import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User, UsersResponse } from '../interfaces/Usuario';
import { ConfigAdmin, ConfigAdminResponse } from '../interfaces/ConfigAdmin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  //Variables privadas:
  private baseUrl: string = environment.baseURL;
  private _configuracionAdmin!: ConfigAdmin;

  //Getters:
  get configuracionAdmin() {
    return { ...this._configuracionAdmin };
  }

  //Métodos:

  obtenerConfigAdmin() {
    const url = `${this.baseUrl}/usuario/obtenerConfigAdmin`
    const body = {}

    return this.http.get<ConfigAdminResponse>(url, body)
      .pipe(
        map(resp => {
          this._configuracionAdmin = {
            cantidadPacientesADiagnosticar: resp.cantidadPacientesADiagnosticar!,
            tiempoRespuesta: resp.tiempoRespuesta!,
            codigoRegistro: resp.codigoRegistro!
          }
          return resp
        }),
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      )
  }

  modificarUsuario(_id: string, name: string, surname: string, email: string) {

    const url = `${this.baseUrl}/usuario/modificarUsuario`
    const body = { _id, name, surname, email };

    return this.http.put<User>(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  modificarPassword(_id: string, passwordActual: string, passwordNueva: string) {

    const url = `${this.baseUrl}/usuario/modificarPassword`
    const body = { _id, passwordActual, passwordNueva };

    return this.http.put<User>(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  //////////////////////////////
  //METODOS PARA ADMINISTRADOR//
  //////////////////////////////

  reiniciarPassword(_id: string, passwordNueva: string) {
    const url = `${this.baseUrl}/usuario/reiniciarPassword`
    const body = { _id, passwordNueva };

    return this.http.put(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  hacerAdmin(_id: string, isAdmin: boolean) {
    const url = `${this.baseUrl}/usuario/hacerAdmin`
    const body = { _id, isAdmin};

    return this.http.put(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  obtenerUsuarios(uid : string) {
    const url = `${this.baseUrl}/usuario/obtenerTodosLosUsuarios`    
    const headers = new HttpHeaders().set('uid' , uid)

    return this.http.get<UsersResponse>(url,{headers})
      .pipe(
        tap(resp => {
          console.log("Usuarios obtenidos: ", resp);
          return resp
        }),
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );

  }

  eliminarUsuario(_id: string) {

    const url = `${this.baseUrl}/usuario/eliminarUsuario`
    const headers = new HttpHeaders()
      .set('_id', _id)

    return this.http.delete<User>(url, { headers })
      .pipe(
        tap(resp => {
          return resp
        }),
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  modificarConfigAdmin(cantidadPacientesADiagnosticar:number, tiempoRespuesta:number,codigoRegistro:number){
    const url = `${this.baseUrl}/usuario/modificarConfigAdmin`
    const body = { cantidadPacientesADiagnosticar, tiempoRespuesta, codigoRegistro };

    return this.http.put<ConfigAdminResponse>(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  editConfigAdmin(cantidadPacientesADiagnosticar:number, tiempoRespuesta:number,codigoRegistro:number){
    console.log("va a modificar el _");
    console.log(cantidadPacientesADiagnosticar, tiempoRespuesta, codigoRegistro);
    
    
    this._configuracionAdmin.cantidadPacientesADiagnosticar = cantidadPacientesADiagnosticar;
    this._configuracionAdmin.tiempoRespuesta= tiempoRespuesta;
    this._configuracionAdmin.codigoRegistro= codigoRegistro;
  }
}
