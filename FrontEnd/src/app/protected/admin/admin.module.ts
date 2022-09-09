//Modulos de Angular:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';

//Modulos de 3ros
import { NgChartsModule } from 'ng2-charts';

//Modulos propios:
import { AdminRoutingModule } from './admin-routing.module';

//Componentes propios:
import { AdministracionUsuariosComponent } from './administracion-usuarios/administracion-usuarios.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ConfigAdminComponent } from './config-admin/config-admin.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NotasAdminComponent,
    AdministracionUsuariosComponent,
    ConfigAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgChartsModule
  ]
})
export class AdminModule { }
