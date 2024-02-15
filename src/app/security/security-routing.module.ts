/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe, John Davidson, Nolan Berryhill
 * Modified Date: 02/13/2024
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'BCRS: Security',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
