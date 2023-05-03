import { TestModuleMetadata } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginComponent } from "../pages/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "../services/auth.service";
import { AuthMockService } from "./auth.mock.service";
import { CommonModule } from "@angular/common";
import { MockProvider, MockService } from 'ng-mocks';
import { HttpClientModule } from "@angular/common/http";

export const AuthMockModule: TestModuleMetadata = {
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientTestingModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  providers: [
    MockProvider(AuthService),
    // AuthService,
    // {
    //   provide: AuthService,
    //   useClass: AuthMockService,
    // },
  ]
}
