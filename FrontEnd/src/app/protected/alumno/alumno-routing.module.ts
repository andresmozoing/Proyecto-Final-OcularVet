import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotasAlumnoComponent } from './notas-alumno/notas-alumno.component';

const routes: Routes = [
  {
    path: 'notas',
    component:NotasAlumnoComponent
  },
  { //Se agrega esta ruta para que funcione el routerLink de la barra de arriba
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


