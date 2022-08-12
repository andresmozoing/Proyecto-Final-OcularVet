import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicioAlumno/inicio.component';
import { MainComponent } from './main/main.component';

// const routes: Routes = [
//   {
//     path:'',
//     children : [
//       { path:'' , component:DashboardComponent},
//       { path:'**' , redirectTo:''},
//     ]
//   }
// ];

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path: 'inicio', component:InicioComponent
      },
      {
        path: '**', redirectTo:'inicio'
      }


      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
