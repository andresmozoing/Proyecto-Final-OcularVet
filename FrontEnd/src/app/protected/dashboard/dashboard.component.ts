import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './index.alumno.html',
  styles: [
    ` * {
          margin : 15px
      }
    `
  ]
})
export class DashboardComponent  {

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  terminosYCondiciones: boolean = false;

  constructor(private router:Router,
              private authservice: AuthService) { }

  get usuario(){
    return this.authservice.usuario;
  }

  logOut(){
    this.authservice.logout()
    this.router.navigateByUrl('/auth/login')
  }



}
