import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from 'src/app/lib/data/services';
import { HttpClientService } from 'src/app/lib/http/http-client';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent,ForgetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    SharedModule,
  ],
  providers: [AuthService, HttpClientService]
})
export class AuthModule { }
