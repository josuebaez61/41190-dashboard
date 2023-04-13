import { Component, OnInit } from '@angular/core';
import { Subject, from } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/notifications.service';

interface Usuario {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  isLoggedIn = new Subject<Usuario>();


  notifier = new Subject<string>()

  constructor(private notificationService: NotificationsService) {}


  async ngOnInit(): Promise<void> {
    this.escucharLoggedIn();

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
        nombre: 'Maria'
      })
    }, 1000);

    setTimeout(() => {
      this.isLoggedIn.next({
        id: 56,
        nombre: 'Jorge'
      })

      this.isLoggedIn.complete();
    }, 5000);


    setTimeout(() => {
      this.isLoggedIn.next({
        id: 60,
        nombre: 'Ana'
      })
    }, 8000);
  }


  crearUsuario(): void {
    this.notificationService.mostrarMensaje('El usuario se creo correctamente');
  }

  escucharLoggedIn(): void {
    this.isLoggedIn.subscribe((valor) => console.log(valor));
  }
}
