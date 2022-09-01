import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

import { UntypedFormControl, UntypedFormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';



@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html'

})
export class PerfilComponent {

  constructor(private authservice: AuthService,
    private usuarioService: UsuarioService) { }

  get usuario() {
    return this.authservice.usuario;
  }

  perfilForm = new UntypedFormGroup({
    name: new UntypedFormControl(this.authservice.usuario.name, Validators.required),
    surname: new UntypedFormControl(this.authservice.usuario.surname, Validators.required),
    LU: new UntypedFormControl(this.authservice.usuario.LU),
    email: new UntypedFormControl(this.authservice.usuario.email, Validators.required),
  })

  passwordForm = new UntypedFormGroup({
    passwordActual: new UntypedFormControl("", Validators.required),
    passwordNueva: new UntypedFormControl('', Validators.required),
    repeticionPassword: new UntypedFormControl('', Validators.required)
  })

  onSubmitProfile() {
    this.usuarioService.modificarUsuario(
      this.authservice.usuario.uid,
      this.perfilForm.value.name,
      this.perfilForm.value.surname,
      this.perfilForm.value.email
    ).subscribe(resp => {
      if (resp.ok === true) {
        this.authservice.editUsuario(this.perfilForm.value.name, this.perfilForm.value.surname, this.perfilForm.value.email);
        Swal.fire('Usuario modificado', '', 'success');
      }
      else {
        console.log('Error al editar usuario', resp, 'error');
        Swal.fire('Error al editar usuario', 'El email ingresado ya existe', 'error');
      }
    })
  }

  onSubmitPassword() {
    let contraseñaNueva: String = this.passwordForm.value.passwordNueva;
    if (this.passwordForm.value.passwordNueva === this.passwordForm.value.repeticionPassword) {
      if (contraseñaNueva.length > 5) {
        this.usuarioService.modificarPassword(
          this.authservice.usuario.uid,
          this.passwordForm.value.passwordActual,
          this.passwordForm.value.passwordNueva
        ).subscribe(resp => {
          if (resp.ok === true) {
            Swal.fire('Usuario modificado', '', 'success');
          }
          else {
            console.log('Error al editar usuario', resp, 'error');
            Swal.fire('Error al editar usuario', 'Contraseña mal ingresada', 'error');
          }
        })
      }
      else {
        console.log('Error jojooj', 'error');
        Swal.fire('Error al editar contraseña', 'La contraseña debe poseer mas de 6 caracteres', 'error');
      }
    }
    else {
      Swal.fire('Error al editar contraseña', 'Las contraseñas no coinciden', 'error');
    }
  }
}








