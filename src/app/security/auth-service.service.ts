// Name: Justin Barlowe
// Date: 2/13/2024
// File: auth.service.ts
// Description: Auth service  file


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isSignedIn: BehaviorSubject<boolean>;

  // Constructor to set the initial value of isSignedIn
  // Creates a new BehaviorSubject with the value of isSignedIn
  constructor() {
    const isSignedIn = localStorage.getItem('isSignedIn') === 'true';
    this._isSignedIn = new BehaviorSubject(isSignedIn);
  }

  // Getter for isSignedIn
  // Returns the value of isSignedIn as an observable
  get isSignedIn$() {
    return this._isSignedIn.asObservable();
  }

  // Setter for isSignedIn
  // Sets the value of isSignedIn in local storage
  // Local storage needed to persist the value of isSignedIn
  setSignedIn(isSignedIn: boolean) {
    localStorage.setItem('isSignedIn', String(isSignedIn));
    this._isSignedIn.next(isSignedIn);
  }

}