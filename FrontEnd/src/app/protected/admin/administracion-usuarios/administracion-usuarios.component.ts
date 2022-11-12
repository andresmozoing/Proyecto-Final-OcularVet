import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../interfaces/Usuario';
import { Usuario } from '../../../auth/interfaces/interfaces';
import { NotaService } from '../../services/nota.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html'
})
export class AdministracionUsuariosComponent {

  usuarios: User[] = [];
  usuariosFiltrados: User[] = [];
  ordenTabla: string = "";
  dataSource!: MatTableDataSource<User>
  ordenActual = "DNIAsc"
  columns: string[] = ['DNI', 'name', 'surname', 'email','fechaAlta', 'isAdmin', 'hacerAdmin' , 'resetPassword', 'borrarUser']

  constructor(
    private usuarioService: UsuarioService,
    private notaService: NotaService,
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.obtenerUsuarios();
    //this.dataSource.sort = this.sort;
  }

  async obtenerUsuarios() {
    
    await this.usuarioService.obtenerUsuarios(this.authService.usuario.uid).subscribe((resp) => {

      this.usuarios = resp.users;
      this.usuariosFiltrados = this.usuarios
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
    //this.dataSource.sort = this.sort;
  }

  async eliminarUsuario(_id: string) {
    await this.usuarioService.eliminarUsuario(_id).subscribe(
      (resp) => {
        if (resp.ok) {

          this.notaService.eliminarNotasUsuario
            (resp.user.DNI).subscribe(
              resp => {
                if (resp.ok) {
                  console.log("Se eliminaron las notas del usuario eliminado correctamente");
                } else {
                  console.log("Error al eliminar notas de usuario");
                }
              }
            )
        }
        this.usuarios = this.usuarios.filter(function (user: User) {
          return (user._id !== _id)
        })
        this.filtrarUsuarios();

      }
    );
  }

  reiniciarPassword(_id: string) {
    console.log("entro a reiniciar Password, id:", _id);

    this.usuarioService.reiniciarPassword(_id, "123456").subscribe(
      (resp) => {
        if (resp.ok === true){
          Swal.fire("Contraseña reiniciada correctamente","","success")          
        }
        else
          console.log("ERROR", resp.console.error());
      }
    );
  }

  async verificarPasswordHacerAdmin (_id : string , isAdmin : boolean){
    const { value: password } = await Swal.fire({
      title: 'Contraseña de usuario requerida',
      text: 'Para poder agregar o quitar permisos de administrador, debe ingresar nuevamente su contraseña',
      input: 'password',
      inputPlaceholder: 'Ingrese su contraseña',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    
    if (password) {
      //Verifico la contraseña del usuario
      const email = this.authService.usuario.email
      this.authService.login(email,password)
      .subscribe((resp) => {
        if (resp.ok === true){ 
 
          this.usuarioService.hacerAdmin(_id,isAdmin).subscribe(
            (resp) => {
              if (resp.ok){
                Swal.fire('Permisos de usuario modificados!' , '', 'success')
                
                //Cambio el valor que se muestra en la tabla
                this.usuarios.map((elem) => { if (elem._id == _id) elem.isAdmin = !isAdmin})
                this.usuariosFiltrados.map((elem) => { if (elem._id == _id) elem.isAdmin = !isAdmin})
              }
              else
                console.log("ERROR al intentar hacer 'hacerAdmin'", resp.console.error());
            }
          );
          
        }
        else{
          Swal.fire('Error' , resp, 'error')
        }
      })
    }
  }

  borrarUsuariosFiltrados(){
    //console.log(this.usuariosFiltrados);
    for (let index = 0; index < this.usuariosFiltrados.length; index++) {
      const usuario = this.usuariosFiltrados[index];
      console.log(index , ": " , usuario.name , " - " , usuario._id);
      if (usuario._id !== undefined){
        this.eliminarUsuario(usuario._id!)
      }
    }
    Swal.fire("Usuarios eliminados correctamente" , " " , "success")
  }

  filtrarUsuarios() {
    const anioInput = <HTMLInputElement>document.getElementById("anioInput");
    const apellidoInput = <HTMLInputElement>document.getElementById("apellidoInput");
    if (anioInput.value !== "") {
      if (apellidoInput.value !== "") {
        //Caso en que filtra por año y apellido
        this.usuariosFiltrados = this.usuarios.filter(function (usuario: User) {
          const fechaUser = new Date(usuario.fechaAlta)
          if ((fechaUser > new Date(anioInput.valueAsNumber, 0, 0)) &&
            (fechaUser < new Date(anioInput.valueAsNumber, 11, 30)) &&
            (usuario.surname!.toUpperCase().startsWith(apellidoInput.value.toUpperCase(),0))) {
            return true
          }
          return false;
        })
      }
      else {
        //Caso en que filtra solo por año
        this.usuariosFiltrados = this.usuarios.filter(function (Usuario: User) {
          const fechaUser = new Date(Usuario.fechaAlta)
          if ((fechaUser > new Date(anioInput.valueAsNumber, 0, 0)) &&
            (fechaUser < new Date(anioInput.valueAsNumber, 11, 30))) {
            return true
          }
          return false;
        })
      }
    }
    else {
      if (apellidoInput.value !== "") {
        //Caso en que filtra solo por apellido
        this.usuariosFiltrados = this.usuarios.filter(function (usuario: User) {
          const fechaUser = new Date(usuario.fechaAlta)
          if (usuario.surname!.toUpperCase().startsWith(apellidoInput.value.toUpperCase(),0)) {
            return true
          }
          return false;
        })
      }
      else {
        //Caso en que no filtra
        this.usuariosFiltrados = this.usuarios
      }
    }
    this.dataSource = new MatTableDataSource(this.usuariosFiltrados);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }








  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

