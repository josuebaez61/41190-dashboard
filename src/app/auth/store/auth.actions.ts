import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/core/models';

export const setAuthenticatedUser = createAction(
  '[Auth] Set authenticated user',
  props<{ payload: Usuario }>()
);

export const unsetAuthenticatedUser = createAction(
  '[Auth] Unset authenticated user',
);
