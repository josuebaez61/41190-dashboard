import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, filter, from, interval, map, tap } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  isLoggedIn = new Subject<Usuario>();
  notifier = new Subject<string>();


  emailControl = new FormControl();
  nombreControl = new FormControl();

  authForm = new FormGroup({
    email: this.emailControl,
    nombre: this.nombreControl,
  })

  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService,
  ) {}


  async ngOnInit(): Promise<void> {
    this.escucharLoggedIn();
    // this.suscribirseAInterval();
    this.escucharCambiosEnEmailControl();

    this.notifier.next('Se completo con exito');

    const obtenerUsuario = new Promise((resolve, reject) => {
      resolve({
        id: 1,
        nombre: 'Josue'
      })
    });

    // CONVERTIR PROMESA EN OBSERVABLE
    const obs$ = from(obtenerUsuario)

    setTimeout(() => {
      this.isLoggedIn.next({
        id: 5,
        nombre: 'Maria',
        email: 'someemail@mail.com'
      })
    }, 1000);

    setTimeout(() => {
      this.isLoggedIn.next({
        id: 56,
        nombre: 'Jorge',
        email: 'someemail@mail.com'
      })

      this.isLoggedIn.complete();
    }, 5000);


    setTimeout(() => {
      this.isLoggedIn.next({
        id: 60,
        nombre: 'Ana',
        email: 'someemail@mail.com'
      })
    }, 8000);
  }


  suscribirseAInterval() {


    interval(1000)
      .pipe(
        map((v) => v * 2),

        // QUIERO ESCUCHAR TODAS LAS EMISIONES QUE NO SEAN 6
        filter((v) => v !== 6)
      )
      .subscribe((v) => console.log(v))
  }


  escucharCambiosEnEmailControl(): void {
    this.emailControl.valueChanges
      .pipe(
        tap((v) => {
          console.log(v)
        }),
        map((v) => v.toLowerCase()),
        tap((v) => console.log(v)),
        // debounceTime(1000)
      )
      .subscribe((valor) => console.log(valor));
  }

  crearUsuario(): void {
    this.notificationService.mostrarMensaje('El usuario se creo correctamente');
  }

  escucharLoggedIn(): void {
    this.isLoggedIn.subscribe((valor) => console.log(valor));
  }

  login(): void {
    this.authService.login({
      ...(this.authForm.value as any),
      id: 54,
    });
  }
}
