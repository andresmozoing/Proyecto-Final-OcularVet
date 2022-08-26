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

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { AdministracionUsuariosComponent } from './administracion-usuarios/administracion-usuarios.component';

@NgModule({
  declarations: [
    InicioComponent,
    MainComponent,
    EjercicioComponent,
    PerfilComponent,
    NotasAlumnoComponent,
    NotasAdminComponent,
    AdministracionUsuariosComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    MatTableModule,
    MatSortModule,
  ]
})
export class ProtectedModule { }
