/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe, John Davidson, Nolan Berryhill
 * Modified Date: 02/17/2024
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

// Routes of security component with children paths
const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'BCRS: Register'
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'BCRS: Reset Password'
      },
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Sign In'
      }
    ]
  }
];

// imports and exports for NgModule
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

// export SecurityRoutingModule
export class SecurityRoutingModule { }
