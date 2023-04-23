import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Usuario } from '../../core/models';
import { LoginPayload } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router) {}

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  logout(): void {
    localStorage.removeItem('auth-user');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  login({ email }: LoginPayload): void {
    const authUser = {
      email,
      id: 1,
      nombre: 'Fake name',
    };

    this.authUser$.next(authUser);
    localStorage.setItem('auth-user', JSON.stringify(authUser));
    this.authUser$
      .asObservable()
      .pipe(take(1))
      .subscribe({
        next: (authUser) => {
          if (authUser) {
            this.router.navigate(['dashboard']);
          }
        },
      });
  }

  verifyToken(): Observable<Usuario | null> {
    const token = localStorage.getItem('auth-user');
    const user = token ? JSON.parse(token) : null;
    if (user) {
      this.authUser$.next(user);
    }

    return this.authUser$.asObservable();
  }
}
