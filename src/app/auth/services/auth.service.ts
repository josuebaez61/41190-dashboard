import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { enviroment } from 'src/environments/environments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/core/services/loading.service';

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
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
  ) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
    this.loadingService.setIsLoading(true);
    this.httpClient.get<Usuario[]>(`${enviroment.apiUrl}/usuarios`, {
      params: {
        ...formValue
      }
    })
    .pipe(
      map((u) => u[0])
    )
    .subscribe((usuario) => {
      if (usuario) {
        localStorage.setItem('token', usuario.token);
        this.authUser$.next(usuario);
        this.router.navigate(['dashboard']);
      } else {
        this.snackBar.open('Usuario o contraseña incorrectos.', 'Ok');
      }
    }, () => {}, () => this.loadingService.setIsLoading(false));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  verificarStorage(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(`${enviroment.apiUrl}/usuarios`, {
      params: {
        token: token || '',
      },
    }).pipe(
      map((u) => {
        const usuario = u[0];
        if (usuario) this.authUser$.next(usuario);
        return usuario ? true : false;
      })
    )

    // const storageValor = localStorage.getItem('auth-user');
    // if (storageValor) {
    //   const usuario = JSON.parse(storageValor);
    //   this.authUser$.next(usuario);
    // }
  }
}
