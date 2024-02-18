/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe
 * Modified Date: 02/13/2024
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './security/signin/signin.component';
import { FaqComponent } from './faq/faq.component';
import { authGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { EmployeeLandingComponent } from './employee-landing/employee-landing.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RoleGuard } from './role.guard';
import { FourzerofourComponent } from './fourzerofour/fourzerofour.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home'
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'BCRS: Contact'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'BCRS: About'
      },
      {
        path: 'security/signin',
        component: SigninComponent,
        title: 'BCRS: Signin'
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQ'
      },
      {
        path: 'employee-landing',
        component: EmployeeLandingComponent,
        title: 'BCRS: Employee Landing',
        canActivate: [authGuard]
      },
      {
        path: 'view-users',
        component: ViewUsersComponent,
        title: 'BCRS: View Users',
        canActivate: [RoleGuard],
        data: { role: 'admin' }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        title: 'BCRS: Create User',
        canActivate: [authGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        title: 'BCRS: Admin',
        canActivate: [authGuard]
      },
      {
        path: '**',
        component: FourzerofourComponent,
        title: 'Not Found'
      }
    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

// export AppRoutingModule
export class AppRoutingModule { }
