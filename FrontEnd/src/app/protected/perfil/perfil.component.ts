import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from '../services/usuario.service';

import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html'
  
})
export class PerfilComponent  {

  
  
  constructor(private router:Router,
              private authservice: AuthService,
              private usuarioService: UsuarioService) { }


  
    get usuario(){
      return this.authservice.usuario;
    }

    perfilForm = new FormGroup({
        name: new FormControl(this.authservice.usuario.name,Validators.required),
        surname: new FormControl(this.authservice.usuario.surname,Validators.required),
        LU: new FormControl(this.authservice.usuario.LU),
        email: new FormControl(this.authservice.usuario.email,Validators.required),
      

    })
    onSubmitProfile(){
      this.usuarioService.modificarUsuario(
              this.authservice.usuario.uid,
              this.perfilForm.value.name,
              this.perfilForm.value.surname,
              this.perfilForm.value.email
              ).subscribe(resp => {                
                if (resp.ok === true){
                  this.authservice.editUsuario(this.perfilForm.value.name, this.perfilForm.value.surname, this.perfilForm.value.email);
                  Swal.fire('Usuario modificado','','success');
                }
                else{
                  console.log('Error al editar usuario',resp,'error');
                  Swal.fire('Error al editar usuario','El email ingresado ya existe','error');
                }
              })
    }
    
  
 
                
  
}
              
              
    
    
  
  


