import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AlumnoDetalleComponent } from './dashboard/pages/alumnos/pages/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';
import { AuthGuard, newAuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  // DASHBOARD
  {
    // http://localhost:XXXX/dashboard
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [newAuthGuard],
    // canActivate: [AuthGuard],
    children: [
      {
        // http://localhost:XXXX/dashboard/estudiantes
        path: 'estudiantes',
        children: [
          {
            // dashboard/estudiantes
            path: '',
            component: AlumnosComponent,
          },
          {
            // dashboard/estudiantes/:id
            path: ':id',
            component: AlumnoDetalleComponent
          }
        ]
      },
      // {
      //   path: 'estudiantes/:id',
      //   component: AlumnoDetalleComponent,
      // },
      {
        path: 'cursos',
        component: CursosComponent,
      }
      // {
      // http://localhost:XXXX/dashboard/comisiones
      //   path: 'comisiones',
      //   component: AlumnosComponent,
      // },
    ]
  },

  // AUTH
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // children: [
    //   {
    //     path: 'login',
    //     component: LoginComponent
    //   },
    // ]
  },

  // RUTAS INDEFINIDAS....
  {
    // CUALQUIER RUTA
    path: '**',
    redirectTo: 'dashboard',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
