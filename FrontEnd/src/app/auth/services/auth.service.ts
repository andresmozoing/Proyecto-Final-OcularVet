import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseURL;
  private _usuario! : Usuario;

  get usuario(){
    
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  registro ( name:string,surname:string,LU:number, email: string, password: string, codigoRegistro:number){
    const url = `${this.baseUrl}/auth/new`
    const body= { name,surname,LU,email,password,codigoRegistro, isAdmin:false}

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( (resp) => { //Los operadores del pipe se ejecutan en cadena. El map va a recibir lo q le deja el tap. Este tap lo unico q hace es dejarte hacer algo con el resp en caso de q quieras modificarlo para el prox operador
          if (resp.ok){
            //Si el response tuvo un status 200, seteamos el token porq sino cuando entre al inicio lo va a sacar, y seteamos el uid del usuario
            localStorage.setItem('token',resp.token!);
          }
        }),
        map (resp => resp.ok), //El map sirve para cuando solo quiero retornar una parte del response. En este caso solo tomo el ok
        catchError(err => of(err.error.msg)) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
        )
      
  }

  login(email: string , password:string){

    const url = `${this.baseUrl}/auth`
    const body= { email,password}

    return this.http.post<AuthResponse>(url,body)
      .pipe( //clase 391. Modificamos el resp para que le llegue bien a login
        tap(resp => { //Los operadores del pipe se ejecutan en cadena. El map va a recibir lo q le deja el tap. Este tap lo unico q hace es dejarte hacer algo con el resp en caso de q quieras modificarlo para el prox operador
          if (resp.ok){
            localStorage.setItem('token', resp.token!)
          }
        }),
        map( resp => resp.ok), //El map sirve para cuando solo quiero retornar una parte del response. En este caso solo tomo el ok
        catchError(err => of(err.error.msg)
        ) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      )
  }

  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`
    const headers = new HttpHeaders()
      .set('x-token' , localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url,{headers})
        .pipe( //Clase 394
          map( resp => {
            localStorage.setItem('token', resp.token!)
            console.log("va a setear el usuario con", resp);
            
            this._usuario = {
              uid: resp.uid!,
              name: resp.name!,
              surname: resp.surname!,
              LU: resp.LU!,
              email: resp.email!,
              isAdmin: resp.isAdmin!

            }
            return resp.ok
          }),
          catchError(err => of(false))
        )
  }

  logout(){
    localStorage.clear()
  }
  editUsuario(name: string, surname: string, email: string){
    this._usuario.name= name;
    this._usuario.surname= surname;
    this._usuario.email= email;

  }
}
