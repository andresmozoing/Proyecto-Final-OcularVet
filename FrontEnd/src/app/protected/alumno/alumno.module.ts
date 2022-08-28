//Modulos de Angular:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

//Modulos propios:
import { AlumnoRoutingModule } from './alumno-routing.module';

//Componentes propios:
import { NotasAlumnoComponent } from './notas-alumno/notas-alumno.component';

@NgModule({
  declarations: [
    NotasAlumnoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    AlumnoRoutingModule
  ]
})
export class AlumnoModule { }
