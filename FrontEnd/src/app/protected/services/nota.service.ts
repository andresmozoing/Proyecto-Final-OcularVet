import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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

  obtenerNotasUsuario(_id:string, DNI:Number):Observable<NotaResponse>{
    const url = `${this.baseUrl}/nota/obtenerNotas`
    const body= { DNI};
    const headers = new HttpHeaders()
      .set('DNI' , DNI.toString())
     
    
    return this.http.get<NotaResponse>(url,{headers})
    .pipe(
      tap( resp => {
  
        return resp
      }),
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
  }

  crearNota ( rtasCorrectas: number, cantidadPreguntas:number, DNI: number, calificacion:number, name:String, surname: String){
    const url = `${this.baseUrl}/nota/crearNota`
    const body = {DNI,cantidadPreguntas,rtasCorrectas,name, surname,calificacion}

    return this.http.post<NotaResponse>(url, body)
      .pipe(
        tap( (resp) => { 
          if (resp.ok){
            console.log("Creo la nota en la base de datos")
          }
        }),
        catchError(err => of(err.error.msg)) 
        )
      
  }

  modificarNombre_y_apellido(DNI: number , name: string , surname : string){
    const url = `${this.baseUrl}/nota/modificarNombre_y_apellido`
    const body = {DNI,name, surname}

    return this.http.put<NotaResponse>(url, body)
      .pipe(
        tap( (resp) => { 
          if (resp.ok){
            console.log("Modifico el nombre y apellido de la nota en la base de datos")
          }
        }),
        catchError(err => of(err.error.msg)) 
        )
  }

  eliminarNota(_id : String){
      const url = `${this.baseUrl}/nota/eliminarNota`
      const headers = new HttpHeaders()
      .set('_id' , _id.toString())
     

    return this.http.delete(url, {headers})
      .pipe(
        tap( (resp) => { 
          console.log("Elimino la nota, respuesta: ",resp)
          
        }),
        catchError(err => of(err.error.msg)) 
        )
  }

  eliminarNotasUsuario(DNI : Number){
    const url = `${this.baseUrl}/nota/eliminarNotasUsuario`
    const headers = new HttpHeaders()
    .set('DNI' , DNI.toString())
   

  return this.http.delete(url, {headers})
    .pipe(
      tap( (resp) => { 
        console.log("Elimino la nota, respuesta: ",resp)
        
      }),
      catchError(err => of(err.error.msg)) 
      )
}

}
