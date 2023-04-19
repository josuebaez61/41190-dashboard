import { Component, OnInit } from '@angular/core';
import { IterableList } from 'src/app/core/classes';

interface Persona {
  id: number;
  nombre: string;
}

interface Profesor extends Persona {
  isActive: boolean;
}

interface Alumno extends Persona {
  profesorId: number;
}


@Component({
  selector: 'app-patron-iterador',
  templateUrl: './patron-iterador.component.html',
  styleUrls: ['./patron-iterador.component.scss']
})
export class PatronIteradorComponent implements OnInit {


  ngOnInit(): void {
    const list = new IterableList('Manzana', 'Naranja', 'Pera');

    // while(list.hasNext()) {
      // console.log(list.next())
    // }

    // console.log(list.get(2));

    // const map = new Map()

    // MAPS

    let cantidadIteraciones = 0;

    const profesores: Profesor[] = [
      {
        id: 87,
        nombre: 'Kakashi',
        isActive: true
      },
      {
        id: 40,
        nombre: 'Kurenai',
        isActive: false,
      },
      {
        id: 27,
        nombre: 'Minato',
        isActive: true
      },
    ]

    const alumnos: Alumno[] = [
      {
        id: 65,
        profesorId: 87,
        nombre: 'Naruto'
      },
      {
        id: 43,
        profesorId: 40,
        nombre: 'Hinata'
      },
      {
        id: 454,
        profesorId: 27,
        nombre: 'Sai'
      }
    ]

    alumnos.forEach((alumno) => {
      cantidadIteraciones++;
      const profesor = profesores.find((p) => {
        cantidadIteraciones++;
        return p.id === alumno.profesorId
      })
      console.log('ALUMNO', alumno.nombre, 'PROFESOR', profesor?.nombre);
    })


    console.log('cantidadIteraciones con ciclos', cantidadIteraciones)

    cantidadIteraciones = 0;

    const profesoresById = new Map<number, Profesor>(
      profesores
      .map((p) => {
        cantidadIteraciones++;
        return [p.id, p];
      }),
    )

    new Map([
      [50, { id: 50, nombre: 'Juan', isActive: true }],
      [40, { id: 40, nombre: 'Mariela', isActive: true }],
    ])

    alumnos.forEach((alumno) => {
      cantidadIteraciones++;
      const profesor = profesoresById.get(alumno.profesorId);

      console.log('ALUMNO', alumno.nombre, 'PROFESOR', profesor?.nombre);
    })

    console.log('cantidadIteraciones con map', cantidadIteraciones)

    // profesores.forEach((p) => {
    //   profesoresById.set(p.id, p);
    // })

  }

}
