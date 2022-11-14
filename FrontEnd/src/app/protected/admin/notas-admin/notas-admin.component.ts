//Imports de Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { $localize } from '@angular/localize/init';

//Imports Servicios/Componentes/Interfaces propios
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../interfaces/Nota';

//Imports de terceros
import { ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html',
  styleUrls: ['./notas-admin.component.css']
})
export class NotasAdminComponent {

  //Vars de graficos
  chartPie: any = [];
  chartBar: any = [];
  //Vars de notas y tablas
  notas!: Nota[];
  notasFiltradas: Nota[] = [];
  dataSource!: MatTableDataSource<Nota>
  columns: string[] = ['DNI', 'name', 'surname', 'fecha', 'rtasCorrectas', 'cantidadPreguntas', 'calificacion', 'borrar']

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private notaService: NotaService,
    private _liveAnnouncer: LiveAnnouncer) { }


  ngOnInit() {
    this.getNotasAlumno();
  }

  calcularCantidadNotas() : number[]{
    let cantidad_0_30 = 0
    let cantidad_30_60 = 0
    let cantidad_60_80 = 0
    let cantidad_80_100 = 0
    let arregloCantidadNotas: number[] = []
    this.notasFiltradas.forEach(nota => {
      if (nota.calificacion < 30) { cantidad_0_30 = cantidad_0_30 + 1; }
      else {
        if (nota.calificacion < 60) { cantidad_30_60 = cantidad_30_60 + 1 }
        else {
          if (nota.calificacion < 80) { cantidad_60_80 = cantidad_60_80 + 1 }
          else { cantidad_80_100 = cantidad_80_100 + 1 }
        }
      }
    });

    arregloCantidadNotas.push(cantidad_0_30, cantidad_30_60, cantidad_60_80, cantidad_80_100)
    return arregloCantidadNotas;
  }

  iniciarGraficos() {
    let arrCantNotas = this.calcularCantidadNotas()
    let labelsCharts = ['0-30', '30-60', '60-80', '80-100']
    let dataSetsCharts = [
      {
        data: arrCantNotas,
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
            beginAtZero: true,
            title:{ display: true, text:'Cantidad de notas'},
            ticks: {                                    
              stepSize: 1  
            }
          },
          x: {
            title:{ display: true, text:'Calificación obtenida'},
          }
        }
      }
    });


  }

  async getNotasAlumno() {
    await this.notaService.obtenerNotas().subscribe(async (resp) => {
      // obtengo las notas y actualizo el contenido de mi tabla
      this.notas = resp.notas;
      this.notasFiltradas = resp.notas;

      this.iniciarGraficos()
      this.dataSource = new MatTableDataSource(this.notas);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
  }


  async eliminarNota(_id: String) {
    await this.notaService.eliminarNota(_id).subscribe(
      (resp) => {        
        if (resp.ok === true){
          Swal.fire("Nota/s borrada/s exitosamente", "", "success")
        }
      }
    )
    this.notas = this.notas.filter(function (nota: Nota) {
      return (nota._id !== _id)
    })
    this.notasFiltradas = this.notas.filter(function (nota: Nota) {
      return (nota._id !== _id)
    })
    this.filtrar()
  }


  filtrar() {
    const anioInput = <HTMLInputElement>document.getElementById("anioInput");
    const apellidoInput = <HTMLInputElement>document.getElementById("apellidoInput");
    if (anioInput.value !== "") {
      if (apellidoInput.value !== "") {
        //Filtra por año y apellido
        this.notasFiltradas = this.notas.filter(function (nota: Nota) {
          const fechaUser = new Date(nota.fecha)
          if ((fechaUser > new Date(anioInput.valueAsNumber, 0, 0)) &&
            (fechaUser < new Date(anioInput.valueAsNumber, 11, 30)) &&
            (nota.surname!.toUpperCase().startsWith(apellidoInput.value.toUpperCase(),0))) {
            return true
          }
          return false;
        })
      }
      else {
        //Filtra solo por año
        this.notasFiltradas = this.notas.filter(function (nota: Nota) {
          const fechaUser = new Date(nota.fecha)
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
        //Filtra solo por apellido
        this.notasFiltradas = this.notas.filter(function (nota: Nota) {
          const fechaUser = new Date(nota.fecha)
          if (nota.surname!.toUpperCase().startsWith(apellidoInput.value.toUpperCase(),0)) {
            return true
          }
          return false;
        })
      }
      else {
        //No filtra
        this.notasFiltradas = this.notas
      }
    }
    this.dataSource = new MatTableDataSource(this.notasFiltradas);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.modificarCharts();
  }

  modificarCharts(){
    this.chartBar.data.datasets[0].data = this.calcularCantidadNotas()
    this.chartPie.data.datasets[0].data = this.calcularCantidadNotas()
    this.chartBar.update()
    this.chartPie.update()
  }

  borrarNotasFiltradas(){
    for (let index = 0; index < this.notasFiltradas.length; index++) {
      let nota = this.notasFiltradas[index];
      console.log(index , ": " , nota.fecha , " - " , nota._id);
      if (nota._id !== undefined){
        this.eliminarNota(nota._id!)
      }
    }
    Swal.fire("Notas eliminadas correctamente" , " " , "success")
  }


  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

 


}

