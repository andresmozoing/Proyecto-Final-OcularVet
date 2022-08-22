import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';


import { ProtectedRoutingModule } from './protected-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


import { InicioComponent } from './inicioAlumno/inicio.component';
import { MainComponent } from './main/main.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NotasAlumnoComponent } from './notas-alumno/notas-alumno.component';



@NgModule({
  declarations: [
    InicioComponent,
    MainComponent,
    EjercicioComponent,
    PerfilComponent,
    NotasAlumnoComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    
  ]
})
export class ProtectedModule { }
