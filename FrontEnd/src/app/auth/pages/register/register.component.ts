//Imports de Angular
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Imports de Servicios propios
import { AuthService } from '../../services/auth.service';

//Imports de terceros
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {


  miFormularioRegistro: UntypedFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    DNI: ['', [Validators.required, Validators.min(999)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required]],
    codigoRegistro: ['', [Validators.required]]
  }, { //Este segundo parametro, tenemos un arreglo de validators, que son funciones que evaluan todo el formulario
    validators: [ this.authservice.camposIguales('password','rePassword') ]
  })

  mostrarOcultarPassword: boolean = false;



  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private authservice: AuthService) { }

  registrar() {
    const { name, surname, DNI, email, password, rePassword, codigoRegistro } = this.miFormularioRegistro.value
    if (password === rePassword) {
      Swal.showLoading()	
      this.authservice.registro(name, surname, DNI, email, password, codigoRegistro)
      .subscribe(ok => {
        Swal.close()
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

} 
