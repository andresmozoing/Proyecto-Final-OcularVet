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
  ordenTabla :string= "";

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
      this.usuarios.sort((a,b)=> a.LU! - b.LU!)
      this.ordenTabla="LUAsc";
    });
  }

  eliminarUsuario(_id: string){
    console.log("entro a eliminar usuario, id:",_id);
    
    
    this.usuarioService.eliminarUsuario(_id).subscribe(
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
  }
  reiniciarPassword(_id: string){
    console.log("entro a reiniciar Password, id:",_id);
    
    
    this.usuarioService.reiniciarPassword(_id,"123456").subscribe(
      (resp)=>{
        console.log("Retorno, resp:", resp);        
        this.obtenerUsuarios();
      }
    );
  }
  
  sortTabla( orden:string) {
    console.log("ORDEN: ",orden, " oRDEN TABLA:", this.ordenTabla);
    
    if(orden === this.ordenTabla){
      switch( orden ){
        case 'LUAsc':
          this.usuarios.sort((a,b)=> b.LU! - a.LU!);
          this.ordenTabla = 'LUDsc';
          break
        case 'nameAsc':
          this.usuarios.sort((a, b)=>{
            var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
            if (nameA < nameB)
              return 1 ;
            if (nameA > nameB)
              return -1 ;
            return 0;
           });
           this.ordenTabla = 'nameDsc';
           break
        case 'surnameAsc':
          this.usuarios.sort((a, b) => {
            var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
            if (surnameA < surnameB)
              return 1;
            if (surnameA > surnameB)
              return -1;
            return 0;
           });
           this.ordenTabla = 'emailDsc';
           break
        case 'emailAsc':
          this.usuarios.sort((a, b) => {
            var emailA = a.email!.toLowerCase(), emailB = b.email!.toLowerCase();
            if (emailA < emailB)
              return 1;
            if (emailA > emailB)
              return -1;
            return 0;
           });
           this.ordenTabla = 'emailDsc';
           break
      }
    } else{
      switch( orden ){
        case 'LUAsc':
          this.usuarios.sort((a,b)=> a.LU! - b.LU!);
          this.ordenTabla = 'LUAsc';
          break
        case 'nameAsc':
          this.usuarios.sort((a, b)=>{
            var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
            if (nameA < nameB)
              return -1 ;
            if (nameA > nameB)
              return 1 ;
            return 0;
           });
           this.ordenTabla = 'nameAsc';
           break
        case 'surnameAsc':
          this.usuarios.sort((a, b) => {
            var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
            if (surnameA < surnameB)
              return -1;
            if (surnameA > surnameB)
              return 1;
            return 0;
           });
           this.ordenTabla = 'surnameAsc';
           break
        case 'emailAsc':
          this.usuarios.sort((a, b) => {
            var emailA = a.email!.toLowerCase(), emailB = b.email!.toLowerCase();
            if (emailA < emailB)
              return -1;
            if (emailA > emailB)
              return 1;
            return 0;
           });
           this.ordenTabla = 'emailAsc';
           break
      }
    }

  }

  
}  

