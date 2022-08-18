import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ConfigAdmin, ConfigAdminResponse } from '../interfaces/ConfigAdmin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {

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

}
