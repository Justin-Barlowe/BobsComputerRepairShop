/**
 * Title: security.module.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe, John Davidson, Nolan Berryhill
 * Modified Date: 02/13/2024
 * Date: 8/5/23
*/

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

// @NgModule assign declarations and imports with bootstrap value
@NgModule({
  declarations: [
    SecurityComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ]
})

// Export SecurityModule
export class SecurityModule { }
