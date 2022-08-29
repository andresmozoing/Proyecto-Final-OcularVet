import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.alumno.html',
  styles: [
    ` * {
          margin : 10px
      }
    `
  ]
})
export class InicioComponent  {


  constructor(private router:Router,
              private authservice: AuthService) { }


  // get usuario(){
  //   return this.authservice.usuario;
  // }
  
  // logOut(){
  //   this.authservice.logout()
  //   this.router.navigateByUrl('/auth/login')
  // }
  
  // get isAdmin(){

  //   if (this.authservice.usuario.isAdmin)
  //     return "PROFESOR";
  //   else
  //     return "ALUMNO";
  // }
  

}
