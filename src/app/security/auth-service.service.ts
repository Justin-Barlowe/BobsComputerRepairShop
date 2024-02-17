// Name: Justin Barlowe
// Date: 2/13/2024
// File: auth.service.ts
// Description: Auth service  file

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isSignedIn: BehaviorSubject<boolean>;
  private _userRole: BehaviorSubject<string | null>;

  // Constructor to set the initial value of isSignedIn
  // Creates a new BehaviorSubject with the value of isSignedIn
  constructor() {

    // Get the value of isSignedIn from local storage
    const isSignedIn = localStorage.getItem('isSignedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    // Set the initial value of isSignedIn and userRole
    this._isSignedIn = new BehaviorSubject<boolean>(isSignedIn);
    this._userRole = new BehaviorSubject<string | null>(
      userRole ? userRole : null
    );
  }

  // Getter for isSignedIn
  // Returns the value of isSignedIn as an observable
  get isSignedIn$() {
    return this._isSignedIn.asObservable();
  }

  // Getter for userRole
  // Returns the value of userRole as an observable
  get userRole$() {
    return this._userRole.asObservable();
  }

  // Setter for isSignedIn
  // Sets the value of isSignedIn in local storage
  // Local storage needed to persist the value of isSignedIn
  setSignedIn(isSignedIn: boolean) {
    localStorage.setItem('isSignedIn', String(isSignedIn));
    this._isSignedIn.next(isSignedIn);

    // Clear the role if signing out
    if (!isSignedIn) {
      this.setUserRole(null);
    }
  }

  // Setter for userRole
  // Sets the value of userRole in local storage
  // Local storage needed to persist the value of userRole
  setUserRole(role: string | null) {
    if (role) {
      localStorage.setItem('userRole', role);
      this._userRole.next(role);
    } else {
      localStorage.removeItem('userRole');
      this._userRole.next(null);
    }
  }

  // Clear the authentication data from local storage
  clearAuthData() {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userRole');
    this._isSignedIn.next(false);
    this._userRole.next(null);
  }
}
