//Imports de Angular
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

//Imports librerias de 3ros
import Swal from 'sweetalert2';

//Imports Servicios propios
import { UsuarioService } from '../services/usuario.service';
import { NotaService } from '../services/nota.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html'

})
export class PerfilComponent {

  constructor(private authservice: AuthService,
    private usuarioService: UsuarioService,
    private notaService: NotaService) { }



  get usuario() {
    return this.authservice.usuario;
  }

  perfilForm = new UntypedFormGroup({
    name: new UntypedFormControl(this.authservice.usuario.name, Validators.required),
    surname: new UntypedFormControl(this.authservice.usuario.surname, Validators.required),
    DNI: new UntypedFormControl(this.authservice.usuario.DNI),
    email: new UntypedFormControl(this.authservice.usuario.email, [Validators.required, Validators.email]),
  })

  passwordForm = new UntypedFormGroup({
    passwordActual: new UntypedFormControl("", [Validators.required, Validators.minLength(6)]),
    passwordNueva: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    repeticionPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
  })

  mostrarOcultarPassword: boolean = false;


  onSubmitProfile() {
    this.usuarioService.modificarUsuario(
      this.authservice.usuario.uid,
      this.perfilForm.value.name,
      this.perfilForm.value.surname,
      this.perfilForm.value.email
    ).subscribe(resp => {
      if (resp.ok === true) {
        //Modificamos el nombre y apellido en las notas del usuario
        if (this.authservice.usuario.name !== this.perfilForm.value.name 
            || this.authservice.usuario.surname !== this.perfilForm.value.surname){
              this.notaService.modificarNombre_y_apellido(this.authservice.usuario.DNI,this.perfilForm.value.name,this.perfilForm.value.surname)
                .subscribe(()=>{
                  console.log("TERMINO DE MODIFICAR ");
                })
            }
        //Modificamos el _usuario del authService
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
            Swal.fire('Contraseña modificada exitosamente!', '', 'success');
          }
          else {
            console.log('Error al editar usuario', resp, 'error');
            Swal.fire('Error al editar contraseña', 'La contraseña actual ingresada no es válida', 'error');
          }
        })
      }
      else {
        Swal.fire('Error al editar contraseña', 'La contraseña debe poseer mas de 6 caracteres', 'error');
      }
    }
    else {
      Swal.fire('Error al editar contraseña', 'Las contraseñas nuevas no coinciden', 'error');
    }
  } //Fin onSubmitPassword()

  campoNoValidoPerfilForm( campo: string ) {
    return this.perfilForm.get(campo)?.invalid
            && this.perfilForm.get(campo)?.touched;
  }

  campoNoValidoPasswordForm( campo: string ) {
    return this.passwordForm.get(campo)?.invalid
            && this.passwordForm.get(campo)?.touched;
  }

  mostrarOcultarPasswordFunction(){
    console.log("holsss");
    this.mostrarOcultarPassword = !this.mostrarOcultarPassword;
  }

}








