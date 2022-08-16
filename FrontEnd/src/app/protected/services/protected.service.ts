import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  private baseUrl : string = environment.baseURL;

  constructor(private http: HttpClient) { }


  modificarUsuario(_id:string, name:string, surname: string, email: string ){

    const url = `${this.baseUrl}/usuario/modificarUsuario`
    const body= { _id, name, surname,email}

    return this.http.put(url,body);
      
  }

}
