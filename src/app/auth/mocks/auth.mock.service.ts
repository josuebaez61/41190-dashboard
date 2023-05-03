import { BehaviorSubject } from "rxjs";
import { Usuario } from "src/app/core/models";

export const USUARIO_ADMIN_MOCK: Usuario = {
  id: 1,
  apellido: 'testapellido',
  email: 'test@mail.com',
  nombre: 'testnombre',
  role: 'admin',
  token: 'asdkjsanfkdams3u2hjdasfadsuh'
}

export class AuthMockService {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  login() {
    this.authUser$.next(USUARIO_ADMIN_MOCK);
  }
}
