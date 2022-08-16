import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProtectedService } from '../services/protected.service';

import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styles: [
    ` * {
      }
    `
  ]
})
export class PerfilComponent  {

  formulario = new FormGroup({
    respuestaElegida: new FormControl(),
  });
  
  constructor(private router:Router,
              private authservice: AuthService,
              private protectedservice: ProtectedService) { }


  
  get usuario(){
     return this.authservice.usuario;
   }
  
  
  //  form.onsubmit = function(e){
  //    e.preventDefault();
  //    var select = document.form.fruit.value;
  //    console.log(select);
  //    document.getElementById('print').innerHTML=select.toUpperCase();
  //   this.protectedservice.modificarUsuario(this.usuario.uid, document.formularioUsuario.name.value,
  //     document.forms.formularioUsuario.surname.value, document.formularioUsuario.email.value)
  


  onSubmit(){

  }

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
