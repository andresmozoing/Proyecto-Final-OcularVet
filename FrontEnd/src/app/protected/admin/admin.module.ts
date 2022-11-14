//Modulos de Angular:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from './customPaginator';

//Modulos de 3ros
import { NgChartsModule } from 'ng2-charts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Modulos propios:
import { AdminRoutingModule } from './admin-routing.module';

//Componentes propios:
import { AdministracionUsuariosComponent } from './administracion-usuarios/administracion-usuarios.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { ConfigAdminComponent } from './config-admin/config-admin.component';


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
    NgChartsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class AdminModule { }
