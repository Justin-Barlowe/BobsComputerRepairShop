
/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe
 * Modified on: 02/12/2023
 * Date: 8/5/23
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../security/auth-service.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isSignedIn: boolean;

  // Constructor with AuthService, CookieService, and Router parameters
  // The constructor initializes the isSignedIn variable to false
  // The constructor also subscribes to the isSignedIn$ observable and sets the isSignedIn variable to the value of the observable
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.isSignedIn = false; // Initialize isSignedIn to false
    this.authService.isSignedIn$.subscribe((isSignedIn) => {
      this.isSignedIn = isSignedIn;
    });
  }

  // Sign out function that deletes the authentication token from the cookie
  // and sets the isSignedIn variable to false
  // Navigates to the sign-in page if the user is not signed in
  signOut(): void {
    this.cookieService.delete('authToken');
    this.authService.setSignedIn(false);
    this.router.navigate(['/security/signin']);
  }
}