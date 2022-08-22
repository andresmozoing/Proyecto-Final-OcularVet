import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { Diagnostico } from '../interfaces/Diagnostico';
import Swal from 'sweetalert2';
import { DiagnosticoService } from '../services/diagnostico.service';
import { UsuarioService } from '../services/usuario.service';
import { ConfigAdmin, ConfigAdminResponse } from '../interfaces/ConfigAdmin';
import { timer } from 'rxjs';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html'
})
export class EjercicioComponent implements OnInit {
  
  

  constructor( private diagnosticoService : DiagnosticoService,
               private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }


  formularioPaciente = new UntypedFormGroup({ respuestaElegida: new UntypedFormControl(),});

  diagnosticosPosibles : Diagnostico[] = []

  diagnosticoActual! : Diagnostico

  cantPacientesADiagnosticar : number = -1

  cantRespuestasCorrectas : number = 0

  cantPacientesRespondidos : number = 0

  tiempoRespuesta: number = 0;

  temporizador : number = 0

  get respuestaElegida(): any { //No se si funciona asi pero bueno
    return this.formularioPaciente.get('respuestaElegida');
  }

  comenzarEjercicio() {
    try{
      this.diagnosticoService.obtenerTodosLosDiagnosticos()
        .subscribe((resp) => {
          console.log("la rta es " , resp.diagnosticos);
          
          this.diagnosticosPosibles = resp.diagnosticos
          console.log("diagnosticosPosibles.length desntor del subscribe es " , this.diagnosticosPosibles.length);
          if (this.diagnosticosPosibles.length > 0){
            //To do: Buscar la cant de pacientes
            this.diagnosticoActual = this.obtenerProximoDiagnostico()
            console.log("dawdd");
            
            this.usuarioService.obtenerConfigAdmin()
              .subscribe((resp)=>{
                console.log("resp es ", resp);
                
                this.cantPacientesADiagnosticar = resp.cantidadPacientesADiagnosticar
                this.tiempoRespuesta = resp.tiempoRespuesta
                this.comenzarTemporizador();
              })
          }
          else{
            Swal.fire("Error","No existen diagnosticos posibles en la base de datos","error")
          }
        })
       ;
    }
    catch(error){
      console.log("Error en el comenzarEjercicio().  " , error);
      
    }
      
  }

  comenzarTemporizador() {
    this.temporizador= this.tiempoRespuesta
    this.temporizador= 5 //BORRAR
    const temp = timer(1000,1000);
    const aux = temp.subscribe(val => {
      console.log(val, '-');
      this.temporizador--
      if (this.temporizador === 0){
        this.cantPacientesRespondidos++;
        Swal.fire("Se acabó el tiempo","","error")
        this.siguientePaciente();
      }
    });
  }

  siguientePaciente(){
    if (this.cantPacientesADiagnosticar !== this.cantPacientesRespondidos){ //Si no terminó
      this.diagnosticoActual = this.obtenerProximoDiagnostico()
      this.formularioPaciente.controls['respuestaElegida'].reset()
      this.comenzarTemporizador()
    }
    else{ //Si ya terminó
      let stringAux = 'Cantidad de pacientes diagnosticados: ' + this.cantPacientesADiagnosticar
      stringAux = stringAux + '\n' + 'Cantidad de respuestas correctas: ' + this.cantRespuestasCorrectas
      console.log(stringAux);
      
      Swal.fire('Autoevaluación finalizada', stringAux, 'info')
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

  diagnosticar(): void {
    console.log("La rta elegida fue ", this.formularioPaciente.value);
    console.log("El diagnostico actual es " , this.diagnosticoActual.id);
    this.cantPacientesRespondidos++;
    if (this.formularioPaciente.value.respuestaElegida === this.diagnosticoActual.id){
      console.log("rta correcta!");
      this.cantRespuestasCorrectas++;
      Swal.fire('Bien hecho!', "Respuesta correcta", 'success')
    }
    else{
      console.log("rta incorrecta");
      Swal.fire('Error' , "Respuesta incorrecta", 'error')
    }
    this.siguientePaciente()

  }


}
