/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe, John Davidson, Nolan Berryhill
 * Modified Date: 02/25/2024
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
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { ViewInvoicesComponent } from './view-invoices/view-invoices.component';
import { InvoiceSearchComponent } from './invoice-search/invoice-search.component';

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
        path: 'invoice-search',
        component: InvoiceSearchComponent,
        title: 'BCRS: Invoice Search',
      },
      {
        path: 'employee-landing',
        component: EmployeeLandingComponent,
        title: 'BCRS: Employee Landing',
        canActivate: [authGuard]
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        title: 'BCRS: My Profile',
        canActivate: [authGuard]
      },
      {
        path: 'employee-directory',
        component: EmployeeDirectoryComponent,
        title: 'BCRS: Employee Directory',
        canActivate: [authGuard]
      },
      {
        path: 'service-repair',
        component: ServiceRepairComponent,
        title: 'BCRS: Service Repair',
        canActivate: [authGuard]
      },
      {
        path: 'invoice-summary',
        component: InvoiceSummaryComponent,
        title: 'BCRS: Invoice Summary',
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
        path: 'view-invoices',
        component: ViewInvoicesComponent,
        title: 'BCRS: View Invoices',
        canActivate: [authGuard]
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
      }

    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: '**',
    component: FourzerofourComponent,
    title: 'Not Found'
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

// export AppRoutingModule
export class AppRoutingModule { }
