import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.authService.verifyToken().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['auth']);
        }
      })
    );
  }
}

export const newAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.verifyToken().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['auth']);
      }
    })
  );
}
