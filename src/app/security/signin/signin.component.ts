// Name: Justin Barlowe
// Date: 2/13/2024
// File: signin.component.ts
// Description: Signin component file

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  signInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private cookieService: CookieService, private authService: AuthService) { }


  // SignIn function, takes in email and password from the form and sends it to the server.
  // If the server returns a 200 status code, the user is signed in and the authentication token is stored in a cookie.
  // The user is then navigated to the employee-landing page.
  signIn() {
    const { email, password } = this.signInForm.value;
    this.http.post('/api/signin', { email, password })
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log(response.message);
            this.authService.setSignedIn(true);
            // Store the authentication token in a cookie
            this.cookieService.set('authToken', response.token);
            // Navigate to the admin page
            this.router.navigate(['/employee-landing']);
          } else {
            // If the server returns an error, log the error to the console
            console.log(response.message);
          }
        },
        // If the server returns an error, log the error to the console
        (error) => {
          console.error(error);
        }
      );
  }
}