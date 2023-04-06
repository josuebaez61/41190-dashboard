import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosComponent } from './formularios.component';

import { ReactiveFormsModule } from '@angular/forms';

// PARA TRABAJAR CON LOS FORMS DE MATERIALS NECESITAN ESTOS DOS MODULOS:
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    FormulariosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    PipesModule,
  ],
  exports: [
    FormulariosComponent
  ]
})
export class FormulariosModule { }
