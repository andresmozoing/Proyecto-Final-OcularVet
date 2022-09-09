import { Component, AfterViewInit } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../interfaces/Nota';
import {ChartOptions} from 'chart.js';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html'
})
export class NotasAdminComponent{

  notas!: Nota[];
  ordenActual: string = "LUAsc";
  chartPie: any = [];
  chartBar: any = [];


  constructor(
    private notaService: NotaService) { }

  ngAfterViewInit() {
    this.notasAlumno();
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

  notasAlumno() {
    return this.notaService.obtenerNotas().subscribe((resp) => {
      // obtengo las notas y actualizo el contenido de mi tabla
      this.notas = resp.notas;
      this.setearGraficos()
    });
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
        this.notas.sort(function(a, b)  {
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
        this.notas.sort((a, b) =>{
          if (a.fecha < b.fecha){
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

