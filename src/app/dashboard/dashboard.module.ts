import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CursosModule } from './pages/cursos/cursos.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AlumnoDetalleComponent } from './pages/alumnos/pages/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    // AlumnosModule,
    // CursosModule,
    RouterModule.forChild([
      {
        // http://localhost:XXXX/dashboard/estudiantes
        path: 'estudiantes',
        canActivate: [AdminGuard],
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
        // children: [
        //   {
        //     // dashboard/estudiantes
        //     path: '',
        //     component: AlumnosComponent,
        //   },
        //   {
        //     // dashboard/estudiantes/:id
        //     path: ':id',
        //     component: AlumnoDetalleComponent
        //   }
        // ]
      },
      {
        path: 'cursos',
        component: CursosComponent,
      }
    ])
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
