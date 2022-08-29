//Modulos de Angular:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

//Modulos propios:
import { AdminRoutingModule } from './admin-routing.module';

//Componentes propios:
import { AdministracionUsuariosComponent } from './administracion-usuarios/administracion-usuarios.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';



@NgModule({
  declarations: [
    NotasAdminComponent,
    AdministracionUsuariosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
