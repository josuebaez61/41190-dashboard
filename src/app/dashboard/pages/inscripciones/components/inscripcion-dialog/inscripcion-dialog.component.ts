import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/alumnos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Curso, CursoWithSubject } from '../../../cursos/models';

@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styleUrls: ['./inscripcion-dialog.component.scss']
})
export class InscripcionDialogComponent implements OnInit {

  alumnos: Alumno[] = [];
  cursos: CursoWithSubject[] = [];

  studentIdControl = new FormControl(null, [Validators.required]);
  subjectIdControl = new FormControl(null, [Validators.required]);
  courseIdControl = new FormControl(null, [Validators.required]);

  incripcionForm = new FormGroup({
    subjectId: this.subjectIdControl,
    studentId: this.studentIdControl,
    courseId: this.courseIdControl,
  });

  constructor(private alumnosService: AlumnosService, private cursosService: CursosService) {
    this.incripcionForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
    this.cursosService.obtenerCursosWithSubject()
      .subscribe({
        next: (res) => {
          this.cursos = res;
        }
      })
    this.alumnosService.getStudentsFromDB()
      .subscribe({
        next: (res) => {
          this.alumnos = res;
        }
      })
  }

}
