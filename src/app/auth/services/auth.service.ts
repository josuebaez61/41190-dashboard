import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, map, catchError, throwError, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { enviroment } from 'src/environments/environments';
import { setAuthenticatedUser, unsetAuthenticatedUser } from '../store/auth.actions';
import { selectAuthState } from '../store/auth.selectors';
import { AppState } from 'src/app/app-store.module';
export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>,
  ) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.store.select(selectAuthState).pipe(map((u) => u?.usuario));
  }

  login(formValue: LoginFormValue): void {
    this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
          this.store.dispatch(setAuthenticatedUser({ payload: usuarioAutenticado }))
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario y contraseña incorrectos!')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
    this.store.dispatch(unsetAuthenticatedUser())
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            this.store.dispatch(setAuthenticatedUser({ payload: usuarioAutenticado }))
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }
}
