//Imports Angular:
import { Component, OnInit, ViewChild } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { Router } from '@angular/router';
//Imports librerias externas:
import Swal from 'sweetalert2';
import {SwalComponent } from '@sweetalert2/ngx-sweetalert2';
//Imports componentes propios:
import { Diagnostico } from '../interfaces/Diagnostico';
import { DiagnosticoService } from '../services/diagnostico.service';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../../auth/services/auth.service';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html'
})
export class EjercicioComponent implements OnInit {
  
  constructor( private AuthService : AuthService,
               private diagnosticoService : DiagnosticoService,
               private usuarioService: UsuarioService,
               private notaService: NotaService,
               private router : Router ) { }

  ngOnInit(): void {
    console.log("entro al ng on init");
    this.usuarioService.obtenerConfigAdmin() //TO DO: Cambiar esto de lugar, creo que no esta bien hacerlo en el NgOnInit
              .subscribe((resp)=>{
                console.log("resp dentro del subscribe de obtenerConfigAdmin es ", resp);
                this.cantPacientesADiagnosticar = resp.cantidadPacientesADiagnosticar
                this.tiempoRespuesta = resp.tiempoRespuesta
            })
  }

  formularioPaciente = new UntypedFormGroup({ respuestaElegida: new UntypedFormControl(),});

  diagnosticosPosibles : Diagnostico[] = []

  diagnosticoActual! : Diagnostico

  cantPacientesADiagnosticar : number = -1

  cantRespuestasCorrectas : number = 0

  cantPacientesRespondidos : number = 0

  tiempoRespuesta: number = 0;

  temporizador : number = 0;

  intervalo: any;

  get respuestaElegida(): any { //No se si funciona asi
    return this.formularioPaciente.get('respuestaElegida');
  }

  @ViewChild('tiempoTerminadoSwal')
  public readonly tiempoTerminadoSwal!: SwalComponent;

  @ViewChild('respuestaCorrectaSwal')
  public readonly respuestaCorrectaSwal!: SwalComponent;

  @ViewChild('respuestaIncorrectaSwal')
  public readonly respuestaIncorrectaSwal!: SwalComponent;

  @ViewChild('autoevalucionFinalizadaSwal')
  public readonly autoevalucionFinalizadaSwal!: SwalComponent;

  iniciarTemporizador(){
    if (this.tiempoRespuesta > 0){
      this.temporizador=this.tiempoRespuesta
      this.doCountdown()
    }
    else{
      Swal.fire("error","el temporiuzador no tiene tiempo","error")
    }
  }

  reiniciarTemporizador(){
    this.temporizador=this.tiempoRespuesta
  }

  doCountdown(){
    this.intervalo = setTimeout(() => {
      if (this.temporizador>0 ){
        this.temporizador--
        this.processCountdown()
      }
    },1000)
  }

  processCountdown(){
    if (this.temporizador === 0){
      this.cantPacientesRespondidos++
      //this.pararTemporizador=true
      clearInterval(this.intervalo)
      this.tiempoTerminadoSwal.fire()
    }
    else{
      this.doCountdown()
    }
  }



  comenzarEjercicio() {
    try{
      this.diagnosticoService.obtenerTodosLosDiagnosticos()
        .subscribe( (resp) => {
          this.diagnosticosPosibles = resp.diagnosticos
          if (this.diagnosticosPosibles.length > 0){
            this.diagnosticoActual = this.obtenerProximoDiagnostico();
            this.iniciarTemporizador()        
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


  siguientePaciente(){
    if (this.cantPacientesADiagnosticar !== this.cantPacientesRespondidos){ //Si no terminó
      this.diagnosticoActual = this.obtenerProximoDiagnostico()
      //this.formularioPaciente.controls['respuestaElegida'].reset()
      this.iniciarTemporizador()
    }
    else{ //Si ya terminó
      this.autoevalucionFinalizadaSwal.fire()
    }
  }

  crearNota(){
    const LU = this.AuthService.usuario.LU
    const cantidadPreguntas = this.cantPacientesADiagnosticar
    const rtasCorrectas = this.cantRespuestasCorrectas
    let calificacion = 0
    if (cantidadPreguntas !== 0){
      calificacion = rtasCorrectas/cantidadPreguntas
      //Dejamos el numero con dos decimales
      let aux = Number((Math.abs(calificacion) * 100).toPrecision(15));
      calificacion = Math.round(aux) / 100 * Math.sign(calificacion);
    }

    this.notaService.crearNota(rtasCorrectas,cantidadPreguntas,LU,calificacion)
      .subscribe((resp) => {
        //En resp viene un arreglo de notas, con una sola nota
        Swal.fire("Nota guardada!","Tu calificacion fue de " + resp.notas[0].calificacion, "success")
        //Redirigir a las notas del usuario?
        this.router.navigateByUrl('/ocularVet/notas')
      })
  }

  







  obtenerProximoDiagnostico() : Diagnostico {    
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
    clearInterval(this.intervalo)
    this.temporizador=0
   // this.pararTemporizador = true
    this.cantPacientesRespondidos++;
    if (this.formularioPaciente.value.respuestaElegida === this.diagnosticoActual.id){
      this.cantRespuestasCorrectas++;
      this.respuestaCorrectaSwal.fire()
    }
    else{
      this.respuestaIncorrectaSwal.fire()
    }
  }


}
