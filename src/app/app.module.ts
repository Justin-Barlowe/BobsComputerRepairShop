/**
 * Title: app.module.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe, John Davidson, Nolan Berryhill
 * Modified Date: 02/13/2024
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './security/signin/signin.component';
import { FaqComponent } from './faq/faq.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeLandingComponent } from './employee-landing/employee-landing.component';
import { ViewUsersComponent } from './view-users/view-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    NavComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    SigninComponent,
    FaqComponent,
    AdminComponent,
    EmployeeLandingComponent,
    ViewUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
