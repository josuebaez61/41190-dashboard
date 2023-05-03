import { TestBed } from "@angular/core/testing";
import { AuthService, LoginFormValue } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { enviroment } from "src/environments/environments";
import { USUARIO_ADMIN_MOCK } from "../mocks/auth.mock.service";
import { RouterTestingModule } from "@angular/router/testing";
import { filter, skip, take } from "rxjs";
import { Router } from "@angular/router";

fdescribe('Pruebas de AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El metodo login adebe funcionar', (done) => {
    const mockPayload: LoginFormValue = {
      email: 'test',
      password: 'test@mail.com'
    };

    spyOn(TestBed.inject(Router), 'navigate').and.stub();

    service.obtenerUsuarioAutenticado()
      .pipe(skip(1))
      .subscribe({
        next: (usuario) => {
          expect(usuario).toBeTruthy();
          done();
        },
      })

    service.login(mockPayload);

    httpController.expectOne({
      url: `${enviroment.apiBaseUrl}/usuarios?email=${mockPayload.email}&password=${mockPayload.password}`,
      method: 'GET',
    }).flush([
      USUARIO_ADMIN_MOCK
    ])
  });
})
