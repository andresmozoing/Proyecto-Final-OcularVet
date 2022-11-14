//Imports de Angular
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Imports de Servicios propios
import { UsuarioService } from '../../services/usuario.service';

//Imports de teceross
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-admin',
  templateUrl: './config-admin.component.html'
})
export class ConfigAdminComponent implements OnInit {

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  configAdminForm = this.fb.group({
    cantidadPacientesADiagnosticar: [this.configuracionAdmin.cantidadPacientesADiagnosticar, [Validators.required]],
    tiempoRespuesta: [this.configuracionAdmin.tiempoRespuesta, [Validators.required, Validators.min(10)]],
    codigoRegistro: [this.configuracionAdmin.codigoRegistro, [Validators.required]]
  });


  get configuracionAdmin() {
    return this.usuarioService.configuracionAdmin;
  }

  notas() {
    this.router.navigateByUrl('ocularVet/admin/notasAdmin')
  }
  usuarios() {
    this.router.navigateByUrl('ocularVet/admin/administracionUsuarios')
  }

  onSubmitConfigAdmin() {

    if (this.configAdminForm.valid) {
      this.usuarioService.modificarConfigAdmin(
        this.configAdminForm.value.cantidadPacientesADiagnosticar,
        this.configAdminForm.value.tiempoRespuesta,
        this.configAdminForm.value.codigoRegistro)
        .subscribe((resp) => {
          if (resp.ok === true) {
            this.usuarioService.editConfigAdmin(this.configAdminForm.value.cantidadPacientesADiagnosticar,
              this.configAdminForm.value.tiempoRespuesta,
              this.configAdminForm.value.codigoRegistro);
            Swal.fire('Configuración del administrador modificada', '', 'success');
          }
          else {
            console.log('Error al editar la configuración del administrador', resp, 'error');
            Swal.fire('Error al editar la configuración del administrador', '', 'error');
          }
        })
    }
    else{
      Swal.fire('Campos inválidos',' Revise por favor los campos. Todos son requeridos. El tiempo de respuesta no puede ser menor a 10.','error')
    }
  }
}
