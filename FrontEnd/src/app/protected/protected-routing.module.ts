import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path: 'alumno',
        loadChildren: () => import('./alumno/alumno.module').then( m=> m.AlumnoModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m=> m.AdminModule)
      },
      {
        path: 'perfil', component:PerfilComponent
      },
      {
        path: 'ejercicio', component:EjercicioComponent
      },
      {
        path: '**', redirectTo:'ejercicio'
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
