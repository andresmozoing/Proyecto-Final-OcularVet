import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './pages-login.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: UntypedFormGroup = this.fb.group({
    email: ['test1@test.com', [ Validators.required , Validators.email]],
    password: ['123456', [Validators.required , Validators.minLength(6)]]
  });


  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private authService:AuthService) { }

  login(){
    console.log(this.miFormulario.value)
    const {email,password} = this.miFormulario.value

    this.authService.login(email,password)
      .subscribe((ok) => {
        console.log(ok)
        if (ok === true){ //Si no le pones el ===true, evalua q exista el objeto, y siempre existe.
          this.router.navigateByUrl('/ocularVet')
        }
        else{
          Swal.fire('Error' , ok, 'error')
          //mostrar error
        }
      })
      
  }

}
