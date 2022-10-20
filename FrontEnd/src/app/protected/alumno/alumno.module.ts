//Modulos de Angular:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos propios:
import { AlumnoRoutingModule } from './alumno-routing.module';

//Componentes propios:
import { NotasAlumnoComponent } from './notas-alumno/notas-alumno.component';
import { AccesoAdminDenegadoComponent } from './acceso-admin-denegado/acceso-admin-denegado.component';


@NgModule({
  declarations: [
    NotasAlumnoComponent,
    AccesoAdminDenegadoComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule
  ]
})
export class AlumnoModule { }
