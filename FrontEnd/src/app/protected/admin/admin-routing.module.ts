//Imports de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Imports de Componentes Propios
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { AdministracionUsuariosComponent } from './administracion-usuarios/administracion-usuarios.component';
import { ConfigAdminComponent } from './config-admin/config-admin.component';

const routes: Routes = [
  {
    path: 'notasAdmin', component: NotasAdminComponent
  },
  {
    path:'administracionUsuarios', component: AdministracionUsuariosComponent
  },
  {
    path:'configAdmin', component: ConfigAdminComponent
  },
  { //Se agrega esta ruta para que funcione el routerLink de la barra de arriba
    path: '',
    pathMatch: 'full',
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
