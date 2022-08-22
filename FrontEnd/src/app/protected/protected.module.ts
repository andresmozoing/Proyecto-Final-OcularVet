import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { InicioComponent } from './inicioAlumno/inicio.component';
import { MainComponent } from './main/main.component';

import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { PerfilComponent } from './perfil/perfil.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    InicioComponent,
    MainComponent,
    EjercicioComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class ProtectedModule { }
