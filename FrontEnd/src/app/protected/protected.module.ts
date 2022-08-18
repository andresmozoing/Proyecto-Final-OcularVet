import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

import { ProtectedRoutingModule } from './protected-routing.module';
import { InicioComponent } from './inicioAlumno/inicio.component';
import { MainComponent } from './main/main.component';

import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { PerfilComponent } from './perfil/perfil.component';



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
    CountdownModule 
  ]
})
export class ProtectedModule { }
