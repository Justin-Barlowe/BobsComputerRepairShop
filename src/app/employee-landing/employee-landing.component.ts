// Name: Justin Barlowe, John Davidson, Nolan Berryhill
// Date: 02/15/2023
// Description: This is the employee landing component that will be used to display the employee landing page.
// File: employee-landing.component.ts

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-employee-landing',
  templateUrl: './employee-landing.component.html',
  styleUrls: ['./employee-landing.component.css']
})
export class EmployeeLandingComponent {
  // Variables for userRole and name
  // Used for landing page options and to display the user's name
  userRole: string;
  name: string;

  // Constructor for the cookie service
  constructor(private cookieService: CookieService) {
    this.userRole = this.cookieService.get('userRole');
    this.name = this.cookieService.get('name');
  }


}
