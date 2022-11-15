//Imports de Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, EmailValidator, ValidationErrors } from '@angular/forms';

//Imports de Servicios Propios
import { UsuarioService } from '../../protected/services/usuario.service';
//Imports de Interfaces Enviroments Propios
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

//Imports de terceros
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseURL;
  private _usuario! : Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient,
              private usuarioService:UsuarioService) { }

  registro ( name:string,surname:string,DNI:number, email: string, password: string, codigoRegistro:number){
    const url = `${this.baseUrl}/auth/new`
    const body= { name,surname,DNI,email,password,codigoRegistro, isAdmin:false}

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
    console.log("Entro al login() del service");

    const url = `${this.baseUrl}/auth`
    const body= { email,password}

    return this.http.post<AuthResponse>(url,body)
      .pipe( // Modificamos el resp para que le llegue bien a login
        tap(resp => { 
          if (resp.ok){
            console.log("Volvio de hacer el post, resp es ", resp);
            console.log("resp is admin es ", resp.isAdmin);
            
            this._usuario = {
              uid: resp.uid!,
              name: resp.name!,
              surname: resp.surname!,
              DNI: resp.DNI!,
              email: resp.email!,
              isAdmin: resp.isAdmin!
            }
            
            localStorage.setItem('token', resp.token!)
          }
        }),
        catchError(err => of(err.error.msg)
        ) //si el resp tiene un status q no es el 200, captura el error. Sino, lo deja pasar y no hace nada este operador 
      )
  }

  validarToken(): Observable<boolean>{
    console.log("Entro al validarToken() del service");

    const url = `${this.baseUrl}/auth/renew`
    const headers = new HttpHeaders()
      .set('x-token' , localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url,{headers})
        .pipe( 
          map( resp => {
            localStorage.setItem('token', resp.token!)  

            this._usuario = {
              uid: resp.uid!,
              name: resp.name!,
              surname: resp.surname!,
              DNI: resp.DNI!,
              email: resp.email!,
              isAdmin: resp.isAdmin!
            }

            //Obtenemos la configuracion del administrador
            this.usuarioService.obtenerConfigAdmin()
                .subscribe((resp) => {
                  
                })
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

  cargarDatosConfigAdmin(){
    this.usuarioService.obtenerConfigAdmin
  }

  camposIguales( campo1: string, campo2: string ) {
    //Retorna una funcion para ser llamada cuando se ejecuta la validación
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      //Obtenemos la info de los campos del formulario
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true }); //Seteo de error al campo para que se muestre en ese campo.
        return { noIguales: true }
      } 
      formGroup.get(campo2)?.setErrors(null); //Cuando sean iguales, le saco el error
      return null
    }

  }
}
