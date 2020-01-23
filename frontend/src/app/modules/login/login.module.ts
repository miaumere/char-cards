import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
