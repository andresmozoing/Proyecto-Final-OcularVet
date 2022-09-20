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


@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html'
})
export class AdministracionUsuariosComponent {


  usuarios: User[] =[] ;
  usuariosFiltrados: User[] =[] ;
  ordenTabla :string= "";
  ordenActual="LUAsc"

  constructor( private authservice: AuthService,
    private usuarioService : UsuarioService,
    private notaService : NotaService
    ) {}
    
    @ViewChild(MatSort) sort!: MatSort;
    
    ngAfterViewInit() {
      this.obtenerUsuarios();    
    }
  obtenerUsuarios(){
    return this.usuarioService.obtenerUsuarios().subscribe( (resp)=>{
      console.log("RESPUESTA de usuarios :", resp);
      
      this.usuarios = resp.users;
      this.usuariosFiltrados = this.usuarios
      this.sortTabla(this.ordenActual)
      this.ordenTabla="LUAsc";
    });
  }

  async eliminarUsuario(_id: string){
    console.log("entro a eliminar usuario, id:",_id);
    
    
    await this.usuarioService.eliminarUsuario(_id).subscribe(
      (resp)=>{
        console.log("Retorno, resp:", resp);
        if (resp.ok){
          console.log(2232);
          
          this.notaService.eliminarNotasUsuario
            (resp.user.LU).subscribe(
            resp=>{
              if(resp.ok){
                console.log("Se eliminaron las notas del usuario eliminado correctamente");
              }else{
                console.log("Error al eliminar notas de usuario");
              }
            }
          )
        }
        console.log();
        
        this.obtenerUsuarios();
      }
    );
    this.sortTabla(this.ordenTabla)
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
  
  sortTabla( ordenNuevo:string, recarga : boolean = false) {
    if (recarga){ 
      //Cuando eliminamos una nota queremos que mantenga el orden
      this.ordenActual="";
    }
    if (ordenNuevo === this.ordenActual) {  //Significa que selecciono dos veces el mismo, cambiamos de Dsc a Asc
      if(this.ordenActual.includes("Asc")){
        ordenNuevo = ordenNuevo.replace("Asc","Dsc") 
      }
    } 
    
    this.ordenActual = ordenNuevo //Actualizamos el ordenActual
    switch (ordenNuevo) { 
      //Descendentes
      case 'LUDsc':
        this.usuariosFiltrados.sort((a, b) => b.LU! - a.LU!);
        break
      case 'nameDsc':
        this.usuariosFiltrados.sort((a, b) => {
          var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
          if (nameA < nameB)
            return 1;
          if (nameA > nameB)
            return -1;
          return 0;
        });
        break
      case 'surnameDsc':
        this.usuariosFiltrados.sort((a, b) => {
          var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
          if (surnameA < surnameB)
            return 1;
          if (surnameA > surnameB)
            return -1;
          return 0;
        });
        break
      case 'emailDsc':
        this.usuariosFiltrados.sort((a, b) => {
          var emailA = a.email!.toLowerCase(), emailB = b.email!.toLowerCase();
          if (emailA < emailB)
            return 1;
          if (emailA > emailB)
            return -1;
          return 0;
        });
        break
      //Ascendentes
      case 'LUAsc':
        this.usuariosFiltrados.sort((a, b) => a.LU! - b.LU!);
        break
      case 'nameAsc':
        this.usuariosFiltrados.sort((a, b) => {
          var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        });
        break
      case 'surnameAsc':
        this.usuariosFiltrados.sort((a, b) => {
          var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
          if (surnameA < surnameB)
            return -1;
          if (surnameA > surnameB)
            return 1;
          return 0;
        });
        break
      case 'emailAsc':
        this.usuariosFiltrados.sort((a, b) => {
          var emailA = a.email!.toLowerCase(), emailB = b.email!.toLowerCase();
          if (emailA < emailB)
            return -1;
          if (emailA > emailB)
            return 1;
          return 0;
        });
        break
          
    }

  }
  
  buscarApellido() {
    const input = <HTMLInputElement>document.getElementById("myInput");
    if (input.value !== ""){
      console.log("input",input.value);
      console.log("inputddas",new Date());
      
      this.usuariosFiltrados = this.usuarios.filter(function(user:User){
        if (user.surname?.toUpperCase().indexOf(input.value.toUpperCase())! > -1){
          return true
        }
        return false;
      })
    }
    console.log("USuarios filtred", this.usuariosFiltrados);
    
  }
}

  
  
  
  
  
