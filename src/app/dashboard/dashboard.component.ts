import { Component, OnDestroy } from '@angular/core';
import { enviroment } from 'src/environments/environments';
import { AuthService } from '../core/services/auth.service';
import { Usuario } from '../core/models';
import { Subject, Subscription, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  showFiller = false;
  isProd = enviroment.isProduction;

  authUser: Usuario | null = null;

  suscripcionAuthUser: Subscription | null = null;

  destroyed$ = new Subject<void>();


  constructor(private authService: AuthService) {

    this.authService.obtenerUsuarioAutenticado()
      .pipe(
        // tomar hasta ... que este destruido
        takeUntil(this.destroyed$)
      )
      .subscribe((usuario) => this.authUser = usuario);
  }

  ngOnDestroy(): void {
    // this.suscripcionAuthUser?.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
