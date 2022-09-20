import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {


  miFormularioRegistro: UntypedFormGroup = this.fb.group({
    name: ['test 1', [Validators.required]],
    surname: ['apellidoTest 1', [Validators.required]],
    LU: ['4231', [Validators.required, Validators.min(999)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    rePassword: ['123456', [Validators.required]],
    codigoRegistro: ['2022', [Validators.required]]
  }, { //En este segundo parametro, tenemos un arreglo de validators, que son funciones que evaluan TODO el formulario
    validators: [ this.authservice.camposIguales('password','rePassword') ]
  })

  mostrarOcultarPassword: boolean = false;



  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private authservice: AuthService) { }

  registrar() {
    const { name, surname, LU, email, password, rePassword, codigoRegistro } = this.miFormularioRegistro.value

    if (password === rePassword) {
      this.authservice.registro(name, surname, LU, email, password, codigoRegistro)
        .subscribe(ok => {
          if (ok === true) {
            this.router.navigateByUrl('/ocularVet');
          }
          else {
            Swal.fire('Error al registrar usuario', ok, 'error')
          }
        })
    }
    else {
      Swal.fire('Las dos contraseñas no coinciden', "Por favor ingrese la misma contraseña en los dos campos", 'error')
    }

  }

  campoNoValido( campo: string ) {
    return this.miFormularioRegistro.get(campo)?.invalid
            && this.miFormularioRegistro.get(campo)?.touched;
  }

  mostrarOcultarPasswordFunction(){
    console.log("holsss");
    this.mostrarOcultarPassword = !this.mostrarOcultarPassword;
  }

} //Fin de la class
