import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoAdminDenegadoComponent } from './acceso-admin-denegado/acceso-admin-denegado.component';
import { NotasAlumnoComponent } from './notas-alumno/notas-alumno.component';

const routes: Routes = [
  {
    path: 'notas',
    component:NotasAlumnoComponent
  },
  {
    path: 'accesoAdminDenegado',
    component:AccesoAdminDenegadoComponent
  },
  { //Se agrega esta ruta para que funcione el routerLink de la barra de encalce
    path: '',
    pathMatch: 'full',
    children: [],
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }


