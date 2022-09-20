import { Component, AfterViewInit } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../interfaces/Nota';
import { ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html',
  styleUrls: ['./notas-admin.component.css']
})
export class NotasAdminComponent {

  notas!: Nota[];
  ordenActual: string = "LUAsc";
  chartPie: any = [];
  chartBar: any = [];


  constructor(
    private notaService: NotaService) { }

  ngAfterViewInit() {
    this.notasAlumno();
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

  notasAlumno() {
    return this.notaService.obtenerNotas().subscribe((resp) => {
      // obtengo las notas y actualizo el contenido de mi tabla
      this.notas = resp.notas;
      this.setearGraficos()
    });
  }

  async eliminarNota(_id: String) {
    await this.notaService.eliminarNota(_id).subscribe(
      (resp) => {
        this.notasAlumno();
      }
    )
    this.sortTabla(this.ordenActual, true);
  }

  sortTabla(ordenNuevo: string, recarga: boolean = false) {
    if (recarga) {
      //Cuando eliminamos una nota queremos que mantenga el orden
      this.ordenActual = "";
    }
    if (ordenNuevo === this.ordenActual) {  //Significa que selecciono dos veces el mismo, cambiamos de Dsc a Asc
      if (this.ordenActual.includes("Asc")) {
        ordenNuevo = ordenNuevo.replace("Asc", "Dsc")
      }
    }
    console.log("orden nuevo:", ordenNuevo, " y el actual:", this.ordenActual);

    this.ordenActual = ordenNuevo //Actualizamos el ordenActual
    switch (ordenNuevo) {
      //Descendentes
      case 'LUDsc':
        this.notas.sort((a, b) => b.LU! - a.LU!);
        break
      case 'nameDsc':
        this.notas.sort((a, b) => {
          var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
          if (nameA < nameB)
            return 1;
          if (nameA > nameB)
            return -1;
          return 0;
        });
        break
      case 'surnameDsc':
        this.notas.sort((a, b) => {
          var surnameA = a.surname!.toLowerCase(), surnameB = b.surname!.toLowerCase();
          if (surnameA < surnameB)
            return 1;
          if (surnameA > surnameB)
            return -1;
          return 0;
        });
        break
      case 'fechaDsc':
        this.notas.sort(function (a, b) {
          if (a.fecha < b.fecha)
            return 1
          if (a.fecha > b.fecha)
            return -1;
          return 0;
        });
        break
      case 'rtasCorrectasDsc':
        this.notas.sort((a, b) => b.rtasCorrectas! - a.rtasCorrectas!);
        break
      case 'cantidadPreguntasDsc':
        this.notas.sort((a, b) => b.cantidadPreguntas! - a.cantidadPreguntas!);
        break
      case 'calificacionDsc':
        this.notas.sort((a, b) => b.calificacion! - a.calificacion!);

        break
      //Ascendentes
      case 'LUAsc':
        this.notas.sort((a, b) => a.LU! - b.LU!);
        break
      case 'nameAsc':
        this.notas.sort((a, b) => {
          var nameA = a.name!.toLowerCase(), nameB = b.name!.toLowerCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        });
        break
      case 'surnameAsc':
        this.notas.sort((a, b) => {
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
        this.notas.sort((a, b) => {
          if (a.fecha < b.fecha) {
            return -1
          }
          if (a.fecha > b.fecha)
            return 1;
          return 0;
        });
        break
      case 'rtasCorrectasAsc':
        this.notas.sort((a, b) => a.rtasCorrectas! - b.rtasCorrectas!);
        break
      case 'cantidadPreguntasAsc':
        this.notas.sort((a, b) => a.cantidadPreguntas! - b.cantidadPreguntas!);
        break
      case 'calificacionAsc':
        this.notas.sort((a, b) => a.calificacion! - b.calificacion!);
        break

    }

  }
}

