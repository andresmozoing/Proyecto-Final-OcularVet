import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Nota } from '../../interfaces/Nota';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
// import { ClaseNota } from './notas-alumno.component';



@Component({
  selector: 'app-notas-alumno',
  templateUrl: './notas-alumno.component.html'
})
export class NotasAlumnoComponent implements AfterViewInit {
  notas!: Nota[];
  
  displayedColumns: string[] = ['LU', 'fecha', 'rtasCorrectas','cantidadPreguntas','calificacion']; 
  datos: Nota[] = [  ];
  dataSource = new MatTableDataSource(this.datos);
  

  constructor( private authservice: AuthService,
    private notaService : NotaService,
    private _liveAnnouncer: LiveAnnouncer) {}
    
    @ViewChild(MatSort) sort!: MatSort;
    
    ngAfterViewInit() {
      this.notasAlumno();
      this.dataSource.sort = this.sort;      
    }
  notasAlumno(){
    return this.notaService.obtenerNotasUsuario(
                  this.authservice.usuario.uid,
                  this.authservice.usuario.LU
    ).subscribe( (resp)=>{

      this.dataSource = new MatTableDataSource(resp.notas);

      this.dataSource.sort = this.sort;
    });
  }
  
  
  announceSortChange(sortState: Sort) {  
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
