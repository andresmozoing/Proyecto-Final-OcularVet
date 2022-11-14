import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Diagnostico, DiagnosticoResponse } from '../interfaces/Diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private baseUrl : string = environment.baseURL;
  
  constructor(private http: HttpClient) { }

  obtenerTodosLosDiagnosticos (){
    const url = `${this.baseUrl}/diagnostico/obtenerTodosLosDiagnosticos`
    const body= {}

    return this.http.get<DiagnosticoResponse>(url, body)
      .pipe(
        catchError(err => of(err.error.msg)) 
        )
  } 

}
