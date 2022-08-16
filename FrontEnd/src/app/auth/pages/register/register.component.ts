import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './pages-register.html',
  styles: [
  ]
})
export class RegisterComponent  {


  miFormularioRegistro : FormGroup = this.fb.group({
    name : ['test 1' ,[Validators.required] ] ,
    surname : ['apellidoTest 1' , [Validators.required]],
    LU : ['4231' , [Validators.required, Validators.minLength(3)]], 
    email: ['test1@test.com' ,[Validators.required , Validators.email]  ], 
    password:['123456' ,[Validators.required , Validators.minLength(6)]],
    codigoRegistro: ['2022' , [Validators.required]]
  })



  constructor(private fb: FormBuilder,
              private router : Router,
              private authservice : AuthService) { }

  registrar(){
    const {name,surname,LU,email,password,codigoRegistro} = this.miFormularioRegistro.value
    
    this.authservice.registro(name,surname,LU,email,password,codigoRegistro)
      .subscribe(ok => {
        if (ok === true){
          this.router.navigateByUrl('/ocularVet');
        }
        else{
          Swal.fire('Error al registrar usuario',ok,'error')
        }
      })
  }


}
