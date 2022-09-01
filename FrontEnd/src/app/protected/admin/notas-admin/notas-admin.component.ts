import { Component, AfterViewInit } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../interfaces/Nota';



@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html'
})
export class NotasAdminComponent{
  notas!: Nota[];
  ordenActual: string = "LUAsc";

  constructor(
    private notaService: NotaService) { }

  ngAfterViewInit() {
    this.notasAlumno();
  }

  notasAlumno() {
    return this.notaService.obtenerNotas().subscribe((resp) => {
      // obtengo las notas y actualizo el contenido de mi tabla
      this.notas = resp.notas;
      
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

