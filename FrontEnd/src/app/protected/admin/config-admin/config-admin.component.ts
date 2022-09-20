import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-config-admin',
  templateUrl: './config-admin.component.html',
  styleUrls: ['./config-admin.component.css']
})
export class ConfigAdminComponent implements OnInit {

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  // configAdminForm = new UntypedFormGroup({
  //   cantidadPacientesADiagnosticar: new UntypedFormControl(this.configuracionAdmin.cantidadPacientesADiagnosticar),
  //   tiempoRespuesta: new UntypedFormControl(this.configuracionAdmin.tiempoRespuesta),
  //   codigoRegistro: new UntypedFormControl(this.configuracionAdmin.codigoRegistro)
  // })

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
