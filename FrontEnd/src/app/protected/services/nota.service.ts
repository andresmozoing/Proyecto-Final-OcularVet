import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { perfilUsuario } from '../interfaces/DatosPerfil';
import { Nota, NotaResponse } from '../interfaces/Nota'

import { catchError, map, tap } from 'rxjs/operators';
import { of ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotaService {

  private baseUrl : string = environment.baseURL;

  constructor(private http: HttpClient,
              ) { }

  obtenerNotas():Observable<NotaResponse>{
    const url = `${this.baseUrl}/nota/obtenerNotas`
    
    
    return this.http.get<NotaResponse>(url)
    .pipe(
      tap( resp => {
        
        
        console.log("rcantidad de preguntas: ", resp);
        return resp
      }),
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }
  obtenerNotasUsuario(_id:string, LU:Number):Observable<NotaResponse>{
    const url = `${this.baseUrl}/nota/obtenerNotas`
    const body= { LU};
    const headers = new HttpHeaders()
      .set('LU' , LU.toString())
     
    
    return this.http.get<NotaResponse>(url,{headers})
    .pipe(
      tap( resp => {
        
        //this.notas = resp.
        //this.notas = resp.notas;
        console.log("rcantidad de preguntas: ", resp);
        return resp
      }),
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  crearNota ( rtasCorrectas: number, cantidadPreguntas:number, LU: number, calificacion:number, name:String, surname: String){
    const url = `${this.baseUrl}/nota/crearNota`
    const body = {LU,cantidadPreguntas,rtasCorrectas,name, surname,fecha : Date.now(),calificacion}

    return this.http.put<NotaResponse>(url, body)
      .pipe(
        tap( (resp) => { 
          if (resp.ok){
            console.log("Creo la nota en la base de datos")
          }
        }),
        catchError(err => of(err.error.msg)) 
        )
      
  }


}
