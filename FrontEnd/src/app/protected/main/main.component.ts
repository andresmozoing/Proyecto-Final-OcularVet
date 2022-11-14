//Imports de Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Imports Servicios propios
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    ` * {
          
      }
    `
  ]
})
export class MainComponent implements OnInit {

  constructor(private router:Router,
              private authservice: AuthService) { }

  ngOnInit(): void {
  }

  get usuario(){
    return this.authservice.usuario;
  }

  logOut(){
    this.authservice.logout()
    this.router.navigateByUrl('/auth/login')
  }

  get isAdmin(){

    if (this.authservice.usuario.isAdmin)
      return "PROFESOR";
    else
      return "ALUMNO";
  }
}
