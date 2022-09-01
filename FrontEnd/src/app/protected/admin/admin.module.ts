//Modulos de Angular:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';

//Modulos propios:
import { AdminRoutingModule } from './admin-routing.module';

//Componentes propios:
import { AdministracionUsuariosComponent } from './administracion-usuarios/administracion-usuarios.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ConfigAdminComponent } from './config-admin/config-admin.component';



@NgModule({
  declarations: [
    NotasAdminComponent,
    AdministracionUsuariosComponent,
    ConfigAdminComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    AdminRoutingModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
