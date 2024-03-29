// Name: Justin Barlowe
// Date: 2/13/2024
// File: auth.guard.ts
// Description: Auth guard file

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);

  // Check if the user has a valid session cookie
  // If they do, console log message and return true
  if (cookie.get('authToken')) {
    console.log('You are logged in and have a valid session cookie set!');
    return true;
  } else {
    // If the user does not have a valid session cookie, console log message and return false.
    console.log('You must be logged in to access this page!');
    const router = inject(Router);

    // Redirect the user to the signin page if they are not logged in
    router.navigate(['/security/signin'], { queryParams: { returnUrl: state.url}});

    return false;
  }
};