import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { perfilUsuario, Nota, NotaResponse } from '../interfaces/DatosPerfil';

import { catchError, tap } from 'rxjs/operators';
import { of ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private notas! : Nota[] ;
  private baseUrl : string = environment.baseURL;

  constructor(private http: HttpClient,
              ) { }

  obtenerNotasUsuario(_id:string, LU:Number,){
    const url = `${this.baseUrl}/nota/obtenerNotas`
    const body= { LU};
    const headers = new HttpHeaders()
      .set('LU' , LU.toString())
     
    
    return this.http.get<NotaResponse>(url,{headers})
    .pipe(
      tap( resp => {
        
        //this.notas = resp.
        this.notas = resp.notas;
        console.log("rcantidad de preguntas: ", resp);
        return resp
      }),
      catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      );
      
    
  }


}
