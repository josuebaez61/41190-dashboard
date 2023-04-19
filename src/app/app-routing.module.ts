import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablasComponent } from './dashboard/pages/tablas/tablas.component';
import { CardsComponent } from './dashboard/pages/cards/cards.component';
import { FormulariosComponent } from './dashboard/pages/formularios/formularios.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AlumnoDetalleComponent } from './dashboard/pages/tablas/pages/alumno-detalle/alumno-detalle.component';

const routes: Routes = [
  {
    // http://localhost:XXXX/dashboard
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        // http://localhost:XXXX/dashboard/estudiantes
        path: 'estudiantes',
        children: [
          {
            // dashboard/estudiantes
            path: '',
            component: TablasComponent,
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
        path: 'cards',
        component: CardsComponent,
      },
      {
        path: 'formularios',
        component: FormulariosComponent,
      },
      // {
      // http://localhost:XXXX/dashboard/comisiones
      //   path: 'comisiones',
      //   component: TablasComponent,
      // },
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
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
  ]
})
export class AppRoutingModule { }
