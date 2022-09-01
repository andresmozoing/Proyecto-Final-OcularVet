import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-config-admin',
  templateUrl: './config-admin.component.html'
})
export class ConfigAdminComponent implements OnInit {

  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  get configuracionAdmin(){
    return this.usuarioService.configuracionAdmin;
  }

  notas() {
    this.router.navigateByUrl('ocularVet/admin/notasAdmin')
  }

  configAdminForm = new UntypedFormGroup({
    cantidadPacientesADiagnosticar: new UntypedFormControl(this.configuracionAdmin.cantidadPacientesADiagnosticar),
    tiempoRespuesta: new UntypedFormControl(this.configuracionAdmin.tiempoRespuesta),
    codigoRegistro: new UntypedFormControl(this.configuracionAdmin.codigoRegistro)
  })

  onSubmitConfigAdmin() {

    this.usuarioService.modificarConfigAdmin(      
      this.configAdminForm.value.cantidadPacientesADiagnosticar,
      this.configAdminForm.value.tiempoRespuesta,
      this.configAdminForm.value.codigoRegistro)
      .subscribe( (resp) => {
        if (resp.ok === true) {
          this.usuarioService.editConfigAdmin( this.configAdminForm.value.cantidadPacientesADiagnosticar,
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
}
