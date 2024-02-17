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
import { FourzerofourComponent } from '../fourzerofour/fourzerofour.component';

// Routes of security component with children paths
const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BDRS: Sign In'
      },
      {
        path: '**',
        component: FourzerofourComponent,
        title: 'Not Found'
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
