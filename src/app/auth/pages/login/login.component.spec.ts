import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { AuthMockModule } from '../../mocks/auth.mock.module';

describe('Pruebas en LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule(AuthMockModule).compileComponents();
    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService);
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe ser invalido si la contraseña no ha sido proveida', () => {
    component.passwordControl.setValue(null);
    expect(component.loginForm.invalid).toBe(true);
  });

  it('Debe llamarse al metodo login de AuthServicse si el formulario es valido en el metodo onSubmit', () => {
    const spyOnAuthServiceLogin = spyOn(authService, 'login');

    component.loginForm.setValue({ email: 'test@mail.com', password: '123456' });
    component.onSubmit();

    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
