import { Component, OnInit, ViewChild } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../interfaces/Nota';
import { ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { $localize } from '@angular/localize/init';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html',
  styleUrls: ['./notas-admin.component.css']
})
export class NotasAdminComponent implements MatPaginatorIntl {
>>>>>>> 41426a1ab5ca6ff1cb1dd5789f68e0144e9b9fc9

  notas!: Nota[];
  notasFiltradas: Nota[]=[];
  ordenActual: string = "LUAsc";
  chartPie: any = [];
  chartBar: any = [];

  dataSource!: MatTableDataSource<Nota> 
  notasData: Nota[]=[]
  columns: string[]=['LU','name','surname','fecha','rtasCorrectas','cantidadPreguntas','calificacion','borrar']

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private notaService: NotaService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
     
    this.notasAlumno();
    this.dataSource.sort = this.sort;
  }

  setearGraficos() {
    let cantidad_0_30 = 0
    let cantidad_30_60 = 0
    let cantidad_60_80 = 0
    let cantidad_80_100 = 0
    let arregloCantidadNotas: number[] = []
    this.notas.forEach(nota => {
      if (nota.calificacion < 30) { cantidad_0_30 = cantidad_0_30 + 1; }
      else {
        if (nota.calificacion < 60) { cantidad_30_60 = cantidad_30_60 + 1 }
        else { 
          if(nota.calificacion < 80) {cantidad_60_80 = cantidad_60_80 + 1 }
          else { cantidad_80_100 = cantidad_80_100 + 1 }
        }
      }
    });

    arregloCantidadNotas.push(cantidad_0_30, cantidad_30_60, cantidad_60_80,cantidad_80_100)

    let labelsCharts = ['0-30', '30-60', '60-80','80-100']
    let dataSetsCharts = [
      {
        data: arregloCantidadNotas,
        borderWidth: 1,
        label: 'Notas',
        backgroundColor: [
          'rgb(140, 137,136 )',
          'rgb(1, 41, 112)',
          'rgb(178,53,153)',
          'rgb(123, 31, 162)'
        ],
        borderColor: [
          'rgb(0, 0,0 )',
          'rgb(0, 0,0 )',
          'rgb(0, 0,0 )',
          'rgb(0, 0,0 )',
        ],
        hoverBackgroundColor: [
          'rgb(205, 200 ,198 )',
          'rgb(28, 105, 242)',
          'rgb(239,79,206)',
          'rgb(173, 68, 218)'
        ],
        hoverBorderColor: [
          'rgb(140, 137,136 )',
          'rgb(1, 41, 112)',
          'rgb(178,53,153)',
          'rgb(123, 31, 162)'
        ]
      }
    ]

    this.chartPie = new Chart('canvasChartPie', {
      type: 'pie',
      data: {
        labels: labelsCharts,
        datasets: dataSetsCharts,
      },
    });

    this.chartBar = new Chart('canvasChartBar', {
      type: 'bar',
      data: {
        labels: labelsCharts,
        datasets: dataSetsCharts,
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
      // this.sortTabla(this.ordenActual)
      this.setearGraficos()
      this.notasData = resp.notas;
      this.dataSource = new MatTableDataSource(this.notasData);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
    this.dataSource.sort = this.sort
  }

  async eliminarNota(_id: String) {
    await this.notaService.eliminarNota(_id).subscribe(
      (resp)=>{
          this.notasAlumno();
        }
      ) 
    this.notas = this.notas.filter(function(nota:Nota) {
      return (nota._id !== _id)
    })
    this.buscaPorAnio(); 
  }

  // sortTabla(ordenNuevo: string, recarga : boolean = false) {
  //   if (recarga){ 
  //     //Cuando eliminamos una nota queremos que mantenga el orden
  //     this.ordenActual="";
  //   }
  //   if (ordenNuevo === this.ordenActual) {  //Significa que selecciono dos veces el mismo, cambiamos de Dsc a Asc
  //     if(this.ordenActual.includes("Asc")){
  //       ordenNuevo = ordenNuevo.replace("Asc","Dsc") 
  //     }
  //   }  
  //   console.log("orden nuevo:",ordenNuevo," y el actual:",this.ordenActual);
    
  //   this.ordenActual = ordenNuevo //Actualizamos el ordenActual
  //   switch (ordenNuevo) { 
  //     //Descendentes
  //     case 'LUDsc':
  //       this.notasFiltradas.sort((a, b) => b.LU! - a.LU!);
  //       break
  //     case 'nameDsc':
  //       this.notasFiltradas.sort((a, b) => {
  //         var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
  //         if (nameA < nameB)
  //           return 1;
  //         if (nameA > nameB)
  //           return -1;
  //         return 0;
  //       });
  //       break
  //     case 'surnameDsc':
  //         this.notasFiltradas.sort((a, b) => {
  //           var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
  //           if (surnameA < surnameB)
  //             return 1;
  //           if (surnameA > surnameB)
  //             return -1;
  //           return 0;
  //         });
  //         break
  //     case 'fechaDsc':
  //       this.notasFiltradas.sort(function(a, b)  {
  //         if (a.fecha < b.fecha)
  //           return 1
  //         if (a.fecha > b.fecha)
  //           return -1;
  //         return 0;
  //       });
  //       break    
  //     case 'rtasCorrectasDsc':
  //       this.notasFiltradas.sort((a, b) => b.rtasCorrectas! - a.rtasCorrectas!);
  //       break
  //     case 'cantidadPreguntasDsc':
  //       this.notasFiltradas.sort((a, b) => b.cantidadPreguntas! - a.cantidadPreguntas!);
  //       break
  //     case 'calificacionDsc':
  //       this.notasFiltradas.sort((a, b) => b.calificacion! - a.calificacion!);
        
  //       break
  //     //Ascendentes
  //     case 'LUAsc':
  //       this.notasFiltradas.sort((a, b) => a.LU! - b.LU!);
  //       break
  //     case 'nameAsc':
  //       this.notasFiltradas.sort((a, b) => {
  //         var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
  //         if (nameA < nameB)
  //           return -1;
  //         if (nameA > nameB)
  //           return 1;
  //         return 0;
  //       });
  //       break
  //     case 'surnameAsc':
  //       this.notasFiltradas.sort((a, b) => {
  //         var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
  //         if (surnameA < surnameB)
  //           return -1;
  //         if (surnameA > surnameB)
  //           return 1;
  //         return 0;
  //       });
  //       break
  //     case 'fechaAsc':
  //       console.log("A  ");
  //       this.notasFiltradas.sort((a, b) =>{
  //         if (a.fecha < b.fecha){
  //           return -1
  //         }
  //         if (a.fecha > b.fecha)
  //           return 1;
  //         return 0;
  //       });
  //       break
  //     case 'rtasCorrectasAsc':
  //       this.notasFiltradas.sort((a, b) => a.rtasCorrectas! - b.rtasCorrectas!);
  //       break
  //     case 'cantidadPreguntasAsc':
  //       this.notasFiltradas.sort((a, b) => a.cantidadPreguntas! - b.cantidadPreguntas!);
  //       break
  //     case 'calificacionAsc':
  //       this.notasFiltradas.sort((a, b) => a.calificacion! - b.calificacion!);
  //       break
        
  //   }

  // }

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

