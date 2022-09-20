import { Component, OnInit, ViewChild } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../interfaces/Nota';
import {ChartOptions} from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { $localize } from '@angular/localize/init';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html'
})
export class NotasAdminComponent implements MatPaginatorIntl {

  notas!: Nota[];
  notasFiltradas: Nota[]=[];
  ordenActual: string = "LUAsc";
  chartPie: any = [];
  chartBar: any = [];

  dataSource!: MatTableDataSource<Nota> 
  notasData: Nota[]=[]
  columns: string[]=['LU','name','surname','fecha','rtasCorrectas','cantidadPreguntas','calificacion']

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private notaService: NotaService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
     
    this.notasAlumno();
    this.dataSource.sort = this.sort;
  }

  setearGraficos(){
    let cantidad_0_40 = 0
    let cantidad_40_70 = 0
    let cantidad_70_100 = 0
    let arregloCantidadNotas : number [] = []
    this.notas.forEach(nota => {
      if (nota.calificacion < 40){ cantidad_0_40 = cantidad_0_40 + 1;}
      else{
        if (nota.calificacion < 70){ cantidad_40_70 = cantidad_40_70 + 1}
        else{cantidad_70_100 = cantidad_70_100 + 1}
      }
    });

    arregloCantidadNotas.push(cantidad_0_40,cantidad_40_70,cantidad_70_100)

    this.chartPie = new Chart('canvasChartPie', {
        type: 'pie',
        data: {
          labels: [ [ '0-40' ], [ '40-70' ], '70-100' ],
          datasets: [
            {
              data: arregloCantidadNotas,
              label: 'Notas',
              borderWidth: 3,
            },
          ],
        },
      });

    this.chartBar = new Chart('canvasChartBar', {
      type: 'bar',
      data: {
        labels: [ [ '0-40' ], [ '40-70' ], '70-100' ],
        datasets: [
          {
            data: arregloCantidadNotas,
            label: 'Notas',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    

  }

  async notasAlumno() {
    await this.notaService.obtenerNotas().subscribe(async (resp) => {
      // obtengo las notas y actualizo el contenido de mi tabla
      this.notas = resp.notas;
      this.notasFiltradas = this.notas;
      this.sortTabla(this.ordenActual)
      this.setearGraficos()
      this.notasData = resp.notas;
      this.dataSource = new MatTableDataSource(this.notasData);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
    this.dataSource.sort = this.sort
  }

  async eliminarNota(_id : String){
    await this.notaService.eliminarNota(_id).subscribe(
      (resp)=>{
          this.notasAlumno();
        }
      ) 
    this.sortTabla(this.ordenActual,true); 
  }

  sortTabla(ordenNuevo: string, recarga : boolean = false) {
    if (recarga){ 
      //Cuando eliminamos una nota queremos que mantenga el orden
      this.ordenActual="";
    }
    if (ordenNuevo === this.ordenActual) {  //Significa que selecciono dos veces el mismo, cambiamos de Dsc a Asc
      if(this.ordenActual.includes("Asc")){
        ordenNuevo = ordenNuevo.replace("Asc","Dsc") 
      }
    }  
    console.log("orden nuevo:",ordenNuevo," y el actual:",this.ordenActual);
    
    this.ordenActual = ordenNuevo //Actualizamos el ordenActual
    switch (ordenNuevo) { 
      //Descendentes
      case 'LUDsc':
        this.notasFiltradas.sort((a, b) => b.LU! - a.LU!);
        break
      case 'nameDsc':
        this.notasFiltradas.sort((a, b) => {
          var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
          if (nameA < nameB)
            return 1;
          if (nameA > nameB)
            return -1;
          return 0;
        });
        break
      case 'surnameDsc':
          this.notasFiltradas.sort((a, b) => {
            var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
            if (surnameA < surnameB)
              return 1;
            if (surnameA > surnameB)
              return -1;
            return 0;
          });
          break
      case 'fechaDsc':
        this.notasFiltradas.sort(function(a, b)  {
          if (a.fecha < b.fecha)
            return 1
          if (a.fecha > b.fecha)
            return -1;
          return 0;
        });
        break    
      case 'rtasCorrectasDsc':
        this.notasFiltradas.sort((a, b) => b.rtasCorrectas! - a.rtasCorrectas!);
        break
      case 'cantidadPreguntasDsc':
        this.notasFiltradas.sort((a, b) => b.cantidadPreguntas! - a.cantidadPreguntas!);
        break
      case 'calificacionDsc':
        this.notasFiltradas.sort((a, b) => b.calificacion! - a.calificacion!);
        
        break
      //Ascendentes
      case 'LUAsc':
        this.notasFiltradas.sort((a, b) => a.LU! - b.LU!);
        break
      case 'nameAsc':
        this.notasFiltradas.sort((a, b) => {
          var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        });
        break
      case 'surnameAsc':
        this.notasFiltradas.sort((a, b) => {
          var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
          if (surnameA < surnameB)
            return -1;
          if (surnameA > surnameB)
            return 1;
          return 0;
        });
        break
      case 'fechaAsc':
        console.log("A  ");
        this.notasFiltradas.sort((a, b) =>{
          if (a.fecha < b.fecha){
            return -1
          }
          if (a.fecha > b.fecha)
            return 1;
          return 0;
        });
        break
      case 'rtasCorrectasAsc':
        this.notasFiltradas.sort((a, b) => a.rtasCorrectas! - b.rtasCorrectas!);
        break
      case 'cantidadPreguntasAsc':
        this.notasFiltradas.sort((a, b) => a.cantidadPreguntas! - b.cantidadPreguntas!);
        break
      case 'calificacionAsc':
        this.notasFiltradas.sort((a, b) => a.calificacion! - b.calificacion!);
        break
        
    }

  }

  buscaPorAnio() {
    const input = <HTMLInputElement>document.getElementById("myInput");
    if (input.value !== ""){

      this.notasFiltradas = this.notas.filter(function(nota:Nota){
        const fechaUser = new Date(nota.fecha)
        if (fechaUser > new Date(input.valueAsNumber,0,0) && 
         (fechaUser < new Date(input.valueAsNumber,11,30))){
          return true
        }
        return false;
      })
    } else{
      this.notasFiltradas = this.notas
    }
    this.dataSource = new MatTableDataSource(this.notasFiltradas);
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    console.log("USuarios filtred", this.notasFiltradas);
    
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

  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }


}

