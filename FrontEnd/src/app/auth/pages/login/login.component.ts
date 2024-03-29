//Imports de Angular
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Imports de terceros
import Swal from 'sweetalert2';
//Imports de Servicios propios
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: UntypedFormGroup = this.fb.group({
    email: ['', [ Validators.required , Validators.email]],
    password: ['', [Validators.required , Validators.minLength(6)]]
  });

  mostrarOcultarPassword: boolean = false;


  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private authService:AuthService) { }

  login(){
    const {email,password} = this.miFormulario.value
    console.log("Entro al login() del component");
    Swal.showLoading()	
    this.authService.login(email,password)
      .subscribe((resp) => {
                	
        if (resp.ok === true){ //Si no le pones el ===true, evalua q exista el objeto, y siempre existe.
          Swal.close()
          if(resp.isAdmin){
            this.router.navigateByUrl('/ocularVet/admin/configAdmin')
          }
          else{
            this.router.navigateByUrl('/ocularVet/alumno/ejercicio')
          }
        }
        else{
          // console.log('resp es ', resp);
          Swal.fire('Error' , resp, 'error')
          //mostrar error
        }
      })
      
  } //fin de login()

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  mostrarOcultarPasswordFunction(){
    this.mostrarOcultarPassword = !this.mostrarOcultarPassword;
  }
}
