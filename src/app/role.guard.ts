// Name: Justin Barlowe
// Date: 2/13/2024
// File: role.guard.ts
// Description: Role guard file

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private cookie: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Fetch the required role from route data
    const requiredRole = route.data['role'];

    // Get the user's role from the cookie or local storage
    const userRole = this.cookie.get('userRole');

    if (userRole && userRole === requiredRole) {
      console.log(`User role is ${userRole}, access granted.`);
      return true;
    } else {
      console.log('Access denied. User does not have the required role.');
      this.router.navigate(['/security/signin'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
