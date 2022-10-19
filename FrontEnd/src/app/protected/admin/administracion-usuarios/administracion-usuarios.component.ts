import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Nota } from '../../interfaces/Nota';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../interfaces/Usuario';
import { Usuario } from '../../../auth/interfaces/interfaces';
import { NotaService } from '../../services/nota.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html'
})
export class AdministracionUsuariosComponent {


  usuarios: User[] =[] ;
  usuariosFiltrados: User[] =[] ;
  ordenTabla :string= "";
  dataSource!: MatTableDataSource<User>
  ordenActual="DNIAsc"
  columns: string[] = ['DNI', 'name', 'surname', 'email', 'isAdmin', 'resetPassword', 'borrarUser']

  constructor( private authservice: AuthService,
    private usuarioService : UsuarioService,
    private notaService : NotaService,
    private _liveAnnouncer: LiveAnnouncer
    ) {}
    
    @ViewChild(MatSort, { static: true }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.obtenerUsuarios();
      this.dataSource.sort = this.sort;    
          
    }
  async obtenerUsuarios(){
    await this.usuarioService.obtenerUsuarios().subscribe( (resp)=>{
      console.log("RESPUESTA de usuarios :", resp);
      
      this.usuarios = resp.users;
      this.usuariosFiltrados = this.usuarios
      this.dataSource = new MatTableDataSource(resp.users);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
    this.dataSource.sort = this.sort;
  }

  async eliminarUsuario(_id: string){
    console.log("entro a eliminar usuario, id:",_id);
    
    
    await this.usuarioService.eliminarUsuario(_id).subscribe(
      (resp)=>{
        console.log("Retorno, resp:", resp);
        if (resp.ok){
          console.log(2232);
          
          this.notaService.eliminarNotasUsuario
            (resp.user.DNI).subscribe(
            resp=>{
              if(resp.ok){
                console.log("Se eliminaron las notas del usuario eliminado correctamente");
              }else{
                console.log("Error al eliminar notas de usuario");
              }
            }
          )
        }
        this.usuarios = this.usuarios.filter(function (user: User) {
          return (user._id !== _id)
        })
        this.filtrar();
        
      }
    );
    // this.sortTabla(this.ordenTabla)
  }
  reiniciarPassword(_id: string){
    console.log("entro a reiniciar Password, id:",_id);
    
    
    this.usuarioService.reiniciarPassword(_id,"123456").subscribe(
      (resp)=>{
        if (resp.ok)
          console.log("Retorno de reiniciar Password, resp:", resp);        
        else
          console.log("ERROR",resp.console.error());
          
          
          
      }
    );
  }
  
  // sortTabla( ordenNuevo:string, recarga : boolean = false) {
  //   if (recarga){ 
  //     //Cuando eliminamos una nota queremos que mantenga el orden
  //     this.ordenActual="";
  //   }
  //   if (ordenNuevo === this.ordenActual) {  //Significa que selecciono dos veces el mismo, cambiamos de Dsc a Asc
  //     if(this.ordenActual.includes("Asc")){
  //       ordenNuevo = ordenNuevo.replace("Asc","Dsc") 
  //     }
  //   } 
    
  //   this.ordenActual = ordenNuevo //Actualizamos el ordenActual
  //   switch (ordenNuevo) { 
  //     //Descendentes
  //     case 'DNIDsc':
  //       this.usuariosFiltrados.sort((a, b) => b.DNI! - a.DNI!);
  //       break
  //     case 'nameDsc':
  //       this.usuariosFiltrados.sort((a, b) => {
  //         var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
  //         if (nameA < nameB)
  //           return 1;
  //         if (nameA > nameB)
  //           return -1;
  //         return 0;
  //       });
  //       break
  //     case 'surnameDsc':
  //       this.usuariosFiltrados.sort((a, b) => {
  //         var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
  //         if (surnameA < surnameB)
  //           return 1;
  //         if (surnameA > surnameB)
  //           return -1;
  //         return 0;
  //       });
  //       break
  //     case 'emailDsc':
  //       this.usuariosFiltrados.sort((a, b) => {
  //         var emailA = a.email!.toLowerCase(), emailB = b.email!.toLowerCase();
  //         if (emailA < emailB)
  //           return 1;
  //         if (emailA > emailB)
  //           return -1;
  //         return 0;
  //       });
  //       break
  //     //Ascendentes
  //     case 'DNIAsc':
  //       this.usuariosFiltrados.sort((a, b) => a.DNI! - b.DNI!);
  //       break
  //     case 'nameAsc':
  //       this.usuariosFiltrados.sort((a, b) => {
  //         var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
  //         if (nameA < nameB)
  //           return -1;
  //         if (nameA > nameB)
  //           return 1;
  //         return 0;
  //       });
  //       break
  //     case 'surnameAsc':
  //       this.usuariosFiltrados.sort((a, b) => {
  //         var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
  //         if (surnameA < surnameB)
  //           return -1;
  //         if (surnameA > surnameB)
  //           return 1;
  //         return 0;
  //       });
  //       break
  //     case 'emailAsc':
  //       this.usuariosFiltrados.sort((a, b) => {
  //         var emailA = a.email!.toLowerCase(), emailB = b.email!.toLowerCase();
  //         if (emailA < emailB)
  //           return -1;
  //         if (emailA > emailB)
  //           return 1;
  //         return 0;
  //       });
  //       break
          
  //   }

  // }
  
  filtrar() {
    const input = <HTMLInputElement>document.getElementById("apellidoInput");
    if (input.value !== ""){
      this.usuariosFiltrados = this.usuarios.filter(function(user:User){
        if (user.surname!.toUpperCase().startsWith(input.value.toUpperCase(),0) ){
          return true
        }
        return false;
      })
    }else{
      this.usuariosFiltrados = this.usuarios;
    }
    this.dataSource = new MatTableDataSource(this.usuariosFiltrados);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log("USuarios filtred", this.usuariosFiltrados);
    
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

  
  
  
  
  
