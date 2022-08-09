import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { InicioComponent } from './inicioAlumno/inicio.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    InicioComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
