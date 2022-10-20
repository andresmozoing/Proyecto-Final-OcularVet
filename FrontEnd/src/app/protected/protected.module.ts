//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,  ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

//Modulos de 3ros:
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Modulos propios:
import { ProtectedRoutingModule } from './protected-routing.module';

//Componentes propios:
import { MainComponent } from './main/main.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    MainComponent,
    EjercicioComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    MatButtonModule
  ]
})
export class ProtectedModule { }
