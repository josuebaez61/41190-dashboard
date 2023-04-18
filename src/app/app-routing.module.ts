import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablasComponent } from './pages/tablas/tablas.component';
import { CardsComponent } from './pages/cards/cards.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';

const routes: Routes = [
  {
    // http://localhost:XXXX/dashboard
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        // http://localhost:XXXX/dashboard/estudiantes
        path: 'estudiantes',
        component: TablasComponent,
      },
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
