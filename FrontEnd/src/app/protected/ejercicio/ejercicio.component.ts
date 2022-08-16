import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Diagnostico } from '../interfaces/Diagnostico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html'
})
export class EjercicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formularioPaciente = new FormGroup({
    respuestaElegida: new FormControl(),
  });

  diagnosticosPosibles : Diagnostico[] = []

  diagnosticoActual! : Diagnostico

  cantPacientesADiagnosticar : number = -1

  cantRespuestasCorrectas : number = 0

  cantPacientesRespondidos : number = 0

  get respuestaElegida(): any { //No se si funciona asi pero bueno
    return this.formularioPaciente.get('respuestaElegida');
  }

  comenzarEjercicio(): void {
    
    this.diagnosticosPosibles = [
      { id : 'normal',
        descripcion : 'Normal',
        derIluminado_AchicaDer : true,
        derIluminado_AchicaIzq : true,
        izqIluminado_AchicaDer : true,
        izqIluminado_AchicaIzq : true
      },
      { id : 'LNO_D',
        descripcion : 'Lesión nervio óptico derecho',
        derIluminado_AchicaDer : false,
        derIluminado_AchicaIzq : false,
        izqIluminado_AchicaDer : true,
        izqIluminado_AchicaIzq : true
      },
      { id : 'LNO_I',
        descripcion : 'Lesión nervio óptico izquierdo',
        derIluminado_AchicaDer : true,
        derIluminado_AchicaIzq : true,
        izqIluminado_AchicaDer : false,
        izqIluminado_AchicaIzq : false
      }
    ]
    if (this.diagnosticosPosibles.length > 0){
      //To do: Buscar la cant de pacientes
      this.diagnosticoActual = this.obtenerProximoDiagnostico()
    }
  }

  obtenerProximoDiagnostico() : Diagnostico {
    console.log("Va a buscar el prox");
    
    let limiteRandom = 1000
    let aleatorio : Diagnostico
    do {
      aleatorio = this.diagnosticosPosibles[Math.floor(Math.random() * this.diagnosticosPosibles.length)];
      if (this.diagnosticoActual){ //Si ya existe uno antes
        if (this.diagnosticoActual.id !== aleatorio.id){
          return aleatorio;
        }
        else{
           limiteRandom = limiteRandom-1;
        }
      }
      else{
        return aleatorio;
      }
    }
    while (limiteRandom > 0);

    return aleatorio;
  }

  onSubmit(): void {
    console.log("La rta elegida fue ", this.formularioPaciente.value);
    console.log("El diagnostico actual es " , this.diagnosticoActual.id);
    if (this.formularioPaciente.value.respuestaElegida === this.diagnosticoActual.id){
      console.log("rta correcta!");
      this.cantRespuestasCorrectas++;
      Swal.fire('Bien hecho!', "Rta correcta", 'success')
    }
    else{
      console.log("rta incorrecta");
      Swal.fire('Error' , "Rta incorrecta", 'error')
    }

    if (this.cantPacientesADiagnosticar !== this.cantPacientesRespondidos){ //Si no terminó
      console.log("El actual es");
      this.diagnosticoActual = this.obtenerProximoDiagnostico()
      console.log("Va a buscar el prox");
    }
    
      Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html:
          'You can use <b>bold text</b>, ' +
          '<a href="//sweetalert2.github.io">links</a> ' +
          'and other HTML tags',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        
      })
    

  }


}
