import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class SignModule { }
