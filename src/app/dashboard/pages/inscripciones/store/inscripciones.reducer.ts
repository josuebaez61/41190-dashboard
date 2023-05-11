import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionWithAll } from '../models';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  loading: boolean;
  inscripciones: InscripcionWithAll[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  inscripciones: [],
  error: null,
};

export const reducer = createReducer<State>(
  initialState,

  // CARGAR
  on(InscripcionesActions.loadInscripciones, state => {
    return {
      ...state,
      loading: true,
    }
  }),

  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      inscripciones: action.data
    }
  }),

  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),


  // ELIMNAR POR ID

  on(InscripcionesActions.deleteInscripcion, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscripcionesActions.deleteInscripcionSuccess, (state, action) => {
    return {
      ...state,
      inscripciones: state.inscripciones.filter((i) => i.id !== action.data),
      loading: false
    };
  }),

  on(InscripcionesActions.deleteInscripcionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

