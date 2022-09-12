//Imports Angular:
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//Imports librerias externas:
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
//Imports componentes propios:
import { Diagnostico } from '../interfaces/Diagnostico';
import { DiagnosticoService } from '../services/diagnostico.service';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../../auth/services/auth.service';
import { NotaService } from '../services/nota.service';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

// import { CdTimerComponent } from 'angular-cd-timer';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
    private diagnosticoService: DiagnosticoService,
    private usuarioService: UsuarioService,
    private notaService: NotaService,
    private router: Router) {

  }
  

  ngOnInit(): void {
    console.log("entro al ng on init");
    // this.usuarioService.obtenerConfigAdmin()
    //   .subscribe((resp) => {
    //     console.log("resp dentro del subscribe de obtenerConfigAdmin es ", resp);
    //     this.cantPacientesADiagnosticar = resp.cantidadPacientesADiagnosticar
    //     this.tiempoRespuesta = resp.tiempoRespuesta
    //   })
    console.log("cant " , this.cantPacientesADiagnosticar);
    console.log("tiempo " , this.tiempoRespuesta);
    
    this.cantPacientesADiagnosticar = this.usuarioService.configuracionAdmin.cantidadPacientesADiagnosticar as number
    this.tiempoRespuesta = this.usuarioService.configuracionAdmin.tiempoRespuesta as number

    console.log("cant " , this.cantPacientesADiagnosticar);
    console.log("tiempo " , this.tiempoRespuesta);
    
  }

  formularioPaciente = new UntypedFormGroup({ respuestaElegida: new UntypedFormControl(), });

  diagnosticosPosibles: Diagnostico[] = []

  diagnosticoActual!: Diagnostico

  cantPacientesADiagnosticar: number = -1

  cantRespuestasCorrectas: number = 0

  cantPacientesRespondidos: number = 0

  tiempoRespuesta: number = 0;

  temporizador: number = 0;

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

  iniciarTemporizador() {
    if (this.tiempoRespuesta > 0) {
      this.temporizador = this.tiempoRespuesta
      this.doCountdown()
    }
    else {
      Swal.fire("error", "el temporiuzador no tiene tiempo", "error")
    }
  }

  reiniciarTemporizador() {
    this.temporizador = this.tiempoRespuesta
  }

  doCountdown() {
    this.intervalo = setTimeout(() => {
      if (this.temporizador > 0) {
        this.temporizador--
        this.processCountdown()
      }
    }, 1000)
  }

  processCountdown() {
    if (this.temporizador === 0) {
      this.cantPacientesRespondidos++
      clearInterval(this.intervalo)
      this.tiempoTerminadoSwal.fire() //TODO: DAWDWAD
    }
    else {
      this.doCountdown()
    }
  }

  comenzarEjercicio() {
    try {
      this.diagnosticoService.obtenerTodosLosDiagnosticos()
        .subscribe((resp) => {
          this.diagnosticosPosibles = resp.diagnosticos
          if (this.diagnosticosPosibles.length > 0) {
            this.diagnosticoActual = this.obtenerProximoDiagnostico();
            this.iniciarTemporizador()
          }
          else {
            Swal.fire("Error", "No existen diagnosticos posibles en la base de datos", "error")
          }
        })
        ;
    }
    catch (error) {
      console.log("Error en el comenzarEjercicio().  ", error);
    }
  }


  siguientePaciente() {
    if (this.cantPacientesADiagnosticar !== this.cantPacientesRespondidos) { //Si no terminó
      this.diagnosticoActual = this.obtenerProximoDiagnostico()
      //this.formularioPaciente.controls['respuestaElegida'].reset()
      const aleatorio:number = Math.floor(Math.random() * 5);
      switch(aleatorio){
        case 1:
          console.log("100 gray");
          this.cambiarColorPerro(100,0,0,100)
          break
        case 2:
          console.log("160 saturate");
          this.cambiarColorPerro(0,160,0,90)
          break
        case 3:
          console.log("60 SEPIA");
          this.cambiarColorPerro(0,0,60,100)
          break
        case 4:
          console.log("SEPIA");          
          this.cambiarColorPerro(0,0,60,100)
          break
        default:
          this.cambiarColorPerro(0,100,0,100)
          break
      }
      this.iniciarTemporizador()

    }
    else { //Si ya terminó
      this.autoevalucionFinalizadaSwal.fire()
    }
  }

  crearNota() {
    const {LU,name, surname} = this.authService.usuario
    const cantidadPreguntas = this.cantPacientesADiagnosticar
    const rtasCorrectas = this.cantRespuestasCorrectas
    let calificacion = 0
    if (cantidadPreguntas !== 0) {
      calificacion = rtasCorrectas / cantidadPreguntas
      //Dejamos el numero con dos decimales
      let aux = Number((Math.abs(calificacion) * 100).toPrecision(15));
      calificacion = (Math.round(aux) / 100 * Math.sign(calificacion)) * 100;
    }

    this.notaService.crearNota(rtasCorrectas, cantidadPreguntas, LU, calificacion, name, surname)
      .subscribe((resp) => {
        //En resp viene un arreglo de notas, con una sola nota
        Swal.fire("Nota guardada!", "Tu calificacion fue de " + resp.notas[0].calificacion, "success")
        //Redirigir a las notas del usuario?
        if (this.authService.usuario.isAdmin) {
          this.router.navigateByUrl('ocularVet/admin/notas')
        }
        else {
          this.router.navigateByUrl('ocularVet/alumno/notas')
        }
      })
  }

  obtenerProximoDiagnostico(): Diagnostico {
    let limiteRandom = 1000
    let aleatorio: Diagnostico
    do {
      aleatorio = this.diagnosticosPosibles[Math.floor(Math.random() * this.diagnosticosPosibles.length)];
      if (this.diagnosticoActual) { //Si ya existe uno antes
        if (this.diagnosticoActual.id !== aleatorio.id) {
          return aleatorio;
        }
        else {
          limiteRandom = limiteRandom - 1;
        }
      }
      else {
        return aleatorio;
      }
    }
    while (limiteRandom > 0);

    return aleatorio;
  }

  diagnosticar(): void {
    //clearInterval(this.intervalo)
    this.temporizador = 0
    //this.timer.stop()
    this.cantPacientesRespondidos++;
    if (this.formularioPaciente.value.respuestaElegida === this.diagnosticoActual.id) {
      this.cantRespuestasCorrectas++;
      this.respuestaCorrectaSwal.fire()
    }
    else {
      this.respuestaIncorrectaSwal.fire()
    }
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalo)
  }

  //Animaciones:

  iluminarOjoDerecho() {
    //Mostramos la linterna por 4 segundos
    const linternaOjoDerecho = document.getElementById('linternaOjoDerecho')!;
    linternaOjoDerecho.style.display = 'block';

    // perro.style.filter = 'sepia(30%)';

    let timerLinternaDerecha = setTimeout(() => {
      linternaOjoDerecho.style.display = 'none';
      // perro.style.filter = '';
      clearInterval(timerLinternaDerecha)
    }, 4000);

    //Desactivamos los botones 
    this.desactivarBotones()

    //Realizamos las animaciones
    if (this.diagnosticoActual.derIluminado_AchicaDer) {
      this.animacionPupila("derecha")
    }
    if (this.diagnosticoActual.derIluminado_AchicaIzq) {
      this.animacionPupila("izquierda")
    }
  }

  iluminarOjoIzquierdo() {
    //Mostramos la linterna por 4 segundos
    const linternaOjoIzquierdo = document.getElementById('linternaOjoIzquierdo')!;
    linternaOjoIzquierdo.style.display = 'block';
    let timerLinternaIzquierda = setTimeout(() => {
      linternaOjoIzquierdo.style.display = 'none';
      clearInterval(timerLinternaIzquierda)
    }, 4000);

    //Desactivamos los botones 
    this.desactivarBotones()

    //Realizamos las animaciones
    if (this.diagnosticoActual.izqIluminado_AchicaDer) {
      this.animacionPupila("derecha")
    }
    if (this.diagnosticoActual.izqIluminado_AchicaIzq) {
      this.animacionPupila("izquierda")
    }
  }

  desactivarBotones() {
    //Hacemos disable del boton de los ojos por 5 segundos
    const botonIluminarDerecho = document.getElementById('botonIluminarOjoDerecho')!;
    botonIluminarDerecho.setAttribute('disabled', 'true')

    const botonIluminarOjoIzquierdo = document.getElementById('botonIluminarOjoIzquierdo')!;
    botonIluminarOjoIzquierdo.setAttribute('disabled', 'true')

    console.log("llego al descativar botones");

    let timerBoton =
      setInterval(() => {
        botonIluminarDerecho.removeAttribute('disabled')
        botonIluminarOjoIzquierdo.removeAttribute('disabled')
        clearInterval(timerBoton)
      }, 4000)
  }

  animacionPupila(posicion: string) {
    let pupila: any
    if (posicion === "izquierda") {
      pupila = document.getElementById('pupilaIzquierda')!;
    }
    else {
      if (posicion === "derecha") {
        pupila = document.getElementById('pupilaDerecha')!;
      }
    }

    //Achicamos la pupila 
    pupila.style.transform = 'scale(0.7,0.7)';
    pupila.style.transition = '1s'

    //Volvemos la pupila al tamaño original, esperando 4 segundos
    let timerOjo =
      setInterval(() => {
        pupila.style.transform = 'scale(1,1)';
        clearInterval(timerOjo)
      }, 4000)
  }

  cambiarColorPerro(grayscale: number, saturate: number, sepia: number, contrast: number){
    const perro = document.getElementById('perro')!;
    perro.style.filter = `grayscale(${grayscale}%) 
                          saturate(${saturate}%)
                          sepia(${sepia}%)
                          contrast(${contrast}%)`
  }


}
