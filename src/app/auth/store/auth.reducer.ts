import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Usuario } from 'src/app/core/models';

export const authFeatureKey = 'auth';

export interface State {
  usuario: Usuario | null;
}

export const initialState: State = {
  usuario: null
};

export const reducer = createReducer<State>(
  initialState,
  on(AuthActions.setAuthenticatedUser, (state, { payload }) => ({
    ...state,
    usuario: payload,
  })),
  on(AuthActions.unsetAuthenticatedUser, () => (initialState))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
